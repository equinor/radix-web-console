import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import * as actionCreators from './action-creators';
import * as subscriptionActionCreators from '../subscriptions/action-creators';
import actionTypes from './action-types';

import {
  mockSocketIoStream,
  createMockStreamingMessage,
} from '../subscriptions/sagas';
import { subscribe } from '../../api/resources';

function* refreshSubscription(url) {
  const messageType = yield select(
    state => state.subscriptions[url].messageType
  );
  let mockSubscriptionResponse;

  try {
    mockSubscriptionResponse = yield call(subscribe, url, messageType);
    yield put(subscriptionActionCreators.subscriptionLoaded(url));
  } catch (e) {
    console.error('Error subscribing to ', url, e);
    yield put(subscriptionActionCreators.subscriptionFailed(url, e.toString()));
    return;
  }

  const mockStreamingMessage = yield call(
    createMockStreamingMessage,
    url,
    mockSubscriptionResponse
  );
  yield mockSocketIoStream.dispatch(mockStreamingMessage);
}

function* subscriptionRefreshFlow() {
  const subscriptions = yield select(state => state.subscriptions);
  const subscriptionKeys = Object.keys(subscriptions);
  yield all(subscriptionKeys.map(url => call(refreshSubscription, url)));
  yield put(actionCreators.subscriptionsRefreshComplete());
}

// -- Watcher saga -------------------------------------------------------------

export default function* watchSubscriptionActions() {
  yield takeLatest(
    actionTypes.SUBSCRIPTIONS_REFRESH_REQUEST,
    subscriptionRefreshFlow
  );
}
