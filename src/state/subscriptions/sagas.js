import { eventChannel } from 'redux-saga';
import { all, call, put, select, take, takeEvery } from 'redux-saga/effects';

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
        type: `${apiResourceName}_${message.type}`,
        payload: message.payload,
      };
    }
  }

  throw Error(
    `Cannot map message type ${message.type} for resource ${message.resource}`
  );
};

/**
 * Create a mock streaming message from a REST JSON response. This is suitable
 * to be processed by the stream watcher
 *
 * @param {string} resource The resource name, e.g. '/applications/my-app'
 * @param {Object} resourceJson The full JSON provided by the REST request
 */
const createMockStreamingMessage = (resource, resourceJson) => {
  return {
    payload: resourceJson,
    resource,
    type: 'SNAPSHOT',
  };
};

// -- Streaming events ---------------------------------------------------------

const mockSocketIoStream = {
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

function* watchSubscriptionActions() {
  yield takeEvery(actionTypes.SUBSCRIBE, subscribeFlow);
  yield takeEvery(actionTypes.SUBSCRIPTIONS_REFRESH, subscriptionRefreshFlow);
  yield takeEvery(actionTypes.UNSUBSCRIBE, unsubscribeFlow);
}

function* subscribeFlow(action) {
  // TODO: When streaming...
  //
  // import { select } from 'redux-saga/effects';
  //
  // const subscription = yield select(state => state.subscriptions[action.resource]);
  //
  // if (subscription.subscribers >= 1) {
  //   return;
  // }

  const apiResourceNames = Object.keys(apiResources);
  for (const apiResourceName of apiResourceNames) {
    const apiResource = apiResources[apiResourceName];

    if (apiResource.urlMatches(action.resource)) {
      const mockSubscriptionJson = yield call(subscribe, action.resource);

      // TODO: When streaming, stop here; the code below simulates a streaming
      // message being received as a response to the REST request triggered by
      // the `subscribe` call above.

      const mockStreamingMessage = yield call(
        createMockStreamingMessage,
        action.resource,
        mockSubscriptionJson
      );

      yield mockSocketIoStream.dispatch(mockStreamingMessage);

      return;
    }
  }

  console.warn('Cannot subscribe to resource', action.resource);
}

function* subscriptionRefreshFlow() {
  yield put(actionCreators.subscriptionsRefreshStart());

  const subscritions = yield select(state => state.subscriptions.streams);
  const subscritionKeys = Object.keys(subscritions);
  for (const subscriptionUrl of subscritionKeys) {
    const mockSubscriptionJson = yield call(subscribe, subscriptionUrl);
    const mockStreamingMessage = yield call(
      createMockStreamingMessage,
      subscriptionUrl,
      mockSubscriptionJson
    );
    yield mockSocketIoStream.dispatch(mockStreamingMessage);
  }
  yield put(actionCreators.subscriptionsRefreshEnd());
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
      yield unsubscribe(action.resource);
      break;
    }
  }
}

// -- Start watcher and channel listener sagas ---------------------------------

export default function*() {
  yield all([watchSubscriptionActions(), watchStream()]);
}
