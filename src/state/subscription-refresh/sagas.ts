import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { subscriptionsRefreshComplete } from './action-creators';
import { actionTypes } from './action-types';

import { SubscriptionsStateType } from '../subscriptions';
import { fetchResource } from '../subscriptions/sagas';
import { RootState } from '../../init/store';

function* subscriptionRefreshFlow() {
  const subscriptions: SubscriptionsStateType = yield select(
    (state: RootState) => state.subscriptions
  );
  const subscriptionKeys = Object.keys(subscriptions);
  yield all(subscriptionKeys.map((url) => call(fetchResource, url)));
  yield put(subscriptionsRefreshComplete());
}

// -- Watcher saga -------------------------------------------------------------

export default function* watchSubscriptionActions() {
  yield takeLatest(
    actionTypes.SUBSCRIPTIONS_REFRESH_REQUEST,
    subscriptionRefreshFlow
  );
}
