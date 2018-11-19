import { eventChannel } from 'redux-saga';
import { all, call, put, take, takeEvery } from 'redux-saga/effects';

import actionTypes from './action-types';
import apiResources, { subscribe } from '../../api/resources';

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
      yield put({ type: mapMessageToAction(message), message });
    } catch (e) {}
  }
}

// TODO: Create eventChannel that receives socket.io events and maps those

// -- Watch for subscription/unsubscription ------------------------------------

function* watchSubscriptionActions() {
  yield takeEvery(actionTypes.SUBSCRIBE, subscribeFlow);
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

  debugger;

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
      yield apiResources.subscribe(action.resource);
      break;
    }
  }
}

// -- Start watcher and channel listener sagas ---------------------------------

export default function*() {
  yield all([watchSubscriptionActions(), watchStream()]);
}
