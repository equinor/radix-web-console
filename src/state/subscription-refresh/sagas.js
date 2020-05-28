import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import * as actionCreators from './action-creators';
import actionTypes from './action-types';

import { fetchResource } from '../subscriptions/sagas';

function* subscriptionRefreshFlow() {
  const subscriptions = yield select((state) => state.subscriptions);
  const subscriptionKeys = Object.keys(subscriptions);
  yield all(subscriptionKeys.map((url) => call(fetchResource, url)));
  yield put(actionCreators.subscriptionsRefreshComplete());
}

// -- Watcher saga -------------------------------------------------------------

export default function* watchSubscriptionActions() {
  yield takeLatest(
    actionTypes.SUBSCRIPTIONS_REFRESH_REQUEST,
    subscriptionRefreshFlow
  );
}
