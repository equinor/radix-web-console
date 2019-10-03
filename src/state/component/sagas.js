import { call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';
import { restartComponent } from '../../api/components';

function* restartComponentWatch() {
  yield takeLatest(actionTypes.COMPONENT_RESTART_REQUEST, restartComponentFlow);
}

export function* restartComponentFlow(action) {
  try {
    const restartedComponent = yield call(restartComponent, action.component);
    yield put(actionCreators.restartComponentConfirm(restartedComponent));
    yield put(subscriptionsRefreshRequest());
  } catch (e) {
    yield put(actionCreators.restartComponentFail(e.toString()));
  }
}

export default function*() {
  yield restartComponentWatch();
}
