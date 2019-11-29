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
  const { resource } = action;
  const apiResourceNames = Object.keys(apiResources);

  for (const apiResourceName of apiResourceNames) {
    const apiResource = apiResources[apiResourceName];
    let response;

    if (apiResource.urlMatches(resource)) {
      const currentState = yield select(state => state.subscriptions[resource]);
      const messageType = currentState.messageType;

      // Check if we already have subscribed to resource; exit to avoid re-request
      if (currentState.subscriberCount !== 1) {
        return;
      }

      yield put(actionCreators.subscriptionLoading(resource));

      try {
        response = yield call(subscribe, resource, messageType);
      } catch (e) {
        yield put(actionCreators.subscriptionFailed(resource, e.toString()));
        return;
      }

      yield put({
        // NB: the action type is generated from the key exported in /src/api/resources.js combined with the type. Since we're using REST, the only action type is '*_SNAPSHOT'
        type: `${apiResourceName}_SNAPSHOT`,
        payload: response,
      });

      yield put(actionCreators.subscriptionLoaded(resource));

      return;
    }
  }

  console.warn('Cannot map URL to resource subscription', resource);
}

function* unsubscribeFlow(action) {
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
  yield all([watchSubscriptionActions()]);
}
