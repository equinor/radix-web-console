import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import * as actionCreators from './action-creators';
import actionTypes from './action-types';

import { fetchResource } from '../subscriptions/sagas';

function* subscriptionRefreshFlow() {
  const subscriptionsCostAPi = yield select((state) => state.subscriptionsCostApi);
  const subscriptionKeys = Object.keys(subscriptionsCostApi);
  yield all(subscriptionKeys.map((url) => call(fetchResource, url)));
  yield put(actionCreators.subscriptionsCostApiRefreshComplete());
}

// -- Watcher saga -------------------------------------------------------------

export default function* watchSubscriptionActions() {
  yield takeLatest(
    actionTypes.SUBSCRIPTIONS_COST_API_REFRESH_REQUEST,
    subscriptionRefreshFlow
  );
}
