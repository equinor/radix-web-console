import { all, call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import {
  disableEnvironmentAlerting,
  enableEnvironmentAlerting,
  updateEnvironmentAlerting,
} from '../../api/environment-alerting';

function* disableAlertingWatch() {
  yield takeLatest(
    actionTypes.ENVIRONMENT_ALERTING_DISABLE_REQUEST,
    disableAlertingFlow
  );
}

export function* disableAlertingFlow(action) {
  try {
    const disableAlerting = yield call(
      disableEnvironmentAlerting,
      action.appName,
      action.envName
    );
    yield put(
      actionCreators.disableEnvironmentAlertingConfirm(disableAlerting)
    );
    yield put(actionCreators.setAlertingSnapshot(disableAlerting));
  } catch (e) {
    console.log('error', e);
    yield put(actionCreators.disableEnvironmentAlertingFail(e.toString()));
  }
}

function* enableAlertingWatch() {
  yield takeLatest(
    actionTypes.ENVIRONMENT_ALERTING_ENABLE_REQUEST,
    enableAlertingFlow
  );
}

export function* enableAlertingFlow(action) {
  try {
    const enabledAlerting = yield call(
      enableEnvironmentAlerting,
      action.appName,
      action.envName
    );
    yield put(actionCreators.enableEnvironmentAlertingConfirm(enabledAlerting));
    yield put(actionCreators.setAlertingSnapshot(enabledAlerting));
  } catch (e) {
    yield put(actionCreators.enableEnvironmentAlertingFail(e.toString()));
  }
}

function* updateAlertingWatch() {
  yield takeLatest(
    actionTypes.ENVIRONMENT_ALERTING_UPDATE_REQUEST,
    updateAlertingFlow
  );
}

export function* updateAlertingFlow(action) {
  try {
    const updatedAlerting = yield call(
      updateEnvironmentAlerting,
      action.appName,
      action.envName,
      action.request
    );
    yield put(actionCreators.updateEnvironmentAlertingConfirm(updatedAlerting));
    yield put(actionCreators.setAlertingSnapshot(updatedAlerting));
  } catch (e) {
    yield put(actionCreators.updateEnvironmentAlertingFail(e.toString()));
  }
}

export default function* componentSaga() {
  yield all([
    disableAlertingWatch(),
    enableAlertingWatch(),
    updateAlertingWatch(),
  ]);
}
