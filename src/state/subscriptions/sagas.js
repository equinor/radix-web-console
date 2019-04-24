import { eventChannel } from 'redux-saga';
import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import * as actionCreators from './action-creators';
import actionTypes from './action-types';
import apiResources, { subscribe, unsubscribe } from '../../api/resources';

/**
 * Create a Redux action based on a streaming message. The type of the action is
 * derived from the key specified in the resources map in '../../api/resources',
 * joined with the type of message.
 *
 * For instance, a message with type SNAPSHOT for the resource '/applications'
 * will trigger a lookup (by calling the `urlMatches` function for each API
 * resource). The result is the key 'APPS'. Joined to the message type, this
 * becomes 'APPS_SNAPSHOT', which is the action type.
 *
 * @param {Object} message A message received via streaming
 */
const mapMessageToAction = message => {
  const apiResourceNames = Object.keys(apiResources);

  for (const apiResourceName of apiResourceNames) {
    const apiResource = apiResources[apiResourceName];

    if (apiResource.urlMatches(message.resource)) {
      return {
        // NB: the action type is generated from the key exported in
        // src/api/resources.js combined with the type
        type: `${apiResourceName}_${message.type}`,
        payload: message.payload,
      };
    }
  }

  throw Error(
    `Cannot map message type ${message.type} for resource ${message.resource}`
  );
};

// TODO: When streaming... shouldn't need to export; only done so "refresh" saga can hook up into these events
/**
 * Create a mock streaming message from a REST JSON response. This is suitable
 * to be processed by the stream watcher
 *
 * @param {string} resource The resource name, e.g. '/applications/my-app'
 * @param {Object} resourceJson The full JSON provided by the REST request
 */
export const createMockStreamingMessage = (resource, resourceJson) => {
  return {
    payload: resourceJson,
    resource,
    type: 'SNAPSHOT', // NB: Message type; used to generate action type in mapMessageToAction()
  };
};

// -- Streaming events ---------------------------------------------------------

// TODO: When streaming... shouldn't need to export; only done so "refresh" saga can hook up into these events
export const mockSocketIoStream = {
  on: function(message) {
    console.warn('Default message handler; please override', message);
  },
  dispatch: function(message) {
    this.on(message);
  },
};

const streamingChannel = eventChannel(emit => {
  const defaultHandler = mockSocketIoStream.on;

  mockSocketIoStream.on = message => emit(message);

  const unsubscribe = () => {
    mockSocketIoStream.on = defaultHandler;
  };

  return unsubscribe;
});

function* watchStream() {
  while (true) {
    try {
      const message = yield take(streamingChannel);
      yield put(mapMessageToAction(message));
    } catch (e) {
      console.error(e);
    }
  }
}

// -- Watch for subscription/unsubscription ------------------------------------

export function* watchSubscriptionActions() {
  yield takeEvery(actionTypes.SUBSCRIBE, subscribeFlow);

  while (true) {
    const action = yield take(actionTypes.UNSUBSCRIBE);
    const subscriptions = yield select(state => state.subscriptions);
    const sub = subscriptions[action.resource];
    if (!sub) {
      yield fork(unsubscribeFlow, action);
    }
  }
}

export function* subscribeFlow(action) {
  // TODO: When streaming...
  //
  // const subscription = yield select(state => state.subscriptions[action.resource]);
  //
  // if (subscription.subscribers >= 1) {
  //   return;
  // }

  const { resource } = action;
  const apiResourceNames = Object.keys(apiResources);

  for (const apiResourceName of apiResourceNames) {
    const apiResource = apiResources[apiResourceName];
    let mockSubscriptionResponse;

    if (apiResource.urlMatches(resource)) {
      const currentState = yield select(state => state.subscriptions[resource]);
      const messageType = currentState.messageType;

      // check if we already have this resource subscribed, then we exit to not
      // refresh. Todo: check age?
      if (currentState.subscriberCount !== 1) {
        return;
      }

      yield put(actionCreators.subscriptionLoading(resource));

      try {
        mockSubscriptionResponse = yield call(subscribe, resource, messageType);
      } catch (e) {
        yield put(actionCreators.subscriptionFailed(resource, e.toString()));
        return;
      }

      // TODO: When streaming, stop here; the code below simulates a streaming
      // message being received as a response to the REST request triggered by
      // the `subscribe` call above.

      const mockStreamingMessage = yield call(
        createMockStreamingMessage,
        resource,
        mockSubscriptionResponse
      );

      yield mockSocketIoStream.dispatch(mockStreamingMessage);

      yield put(actionCreators.subscriptionLoaded(resource));

      return;
    }
  }

  console.warn('Cannot map URL to resource subscription', resource);
}

function* unsubscribeFlow(action) {
  // TODO: When streaming...
  //
  // import { select } from 'redux-saga/effects';
  //
  // const subscription = yield select(state => state.subscriptions[action.resource]);
  //
  // if (subscription.subscribers) {
  //   console.warn('Trying to unsubscribe resource with active subscribers', action.resource);
  //   return;
  // }

  const apiResourceNames = Object.keys(apiResources);

  for (const apiResourceName of apiResourceNames) {
    const apiResource = apiResources[apiResourceName];

    if (apiResource.urlMatches(action.resource)) {
      yield all([
        unsubscribe(action.resource),
        put(actionCreators.subscriptionEnded(apiResourceName)),
      ]);
      break;
    }
  }
}

// -- Start watcher and channel listener sagas ---------------------------------

export default function*() {
  yield all([watchSubscriptionActions(), watchStream()]);
}
