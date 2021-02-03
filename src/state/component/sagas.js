import { all, call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';
import {
  startComponent,
  stopComponent,
  restartComponent,
} from '../../api/components';

function* startComponentWatch() {
  yield takeLatest(actionTypes.COMPONENT_START_REQUEST, startComponentFlow);
}

export function* startComponentFlow(action) {
  try {
    const startedComponent = yield call(startComponent, action.component);
    yield put(actionCreators.startComponentConfirm(startedComponent));
    yield put(subscriptionsRefreshRequest());
  } catch (e) {
    yield put(actionCreators.startComponentFail(e.toString()));
  }
}

function* stopComponentWatch() {
  yield takeLatest(actionTypes.COMPONENT_STOP_REQUEST, stopComponentFlow);
}

export function* stopComponentFlow(action) {
  try {
    const stoppedComponent = yield call(stopComponent, action.component);
    yield put(actionCreators.stoppedComponentConfirm(stoppedComponent));
    yield put(subscriptionsRefreshRequest());
  } catch (e) {
    yield put(actionCreators.stoppedComponentFail(e.toString()));
  }
}

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

export default function* componentSaga() {
  yield all([
    startComponentWatch(),
    stopComponentWatch(),
    restartComponentWatch(),
  ]);
}
