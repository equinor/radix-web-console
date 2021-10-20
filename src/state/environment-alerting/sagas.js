import { all, call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';
import {
  disableEnvironmentAlerting,
  enableEnvironmentAlerting,
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
    yield put(subscriptionsRefreshRequest());
  } catch (e) {
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
    yield put(subscriptionsRefreshRequest());
  } catch (e) {
    yield put(actionCreators.enableEnvironmentAlertingFail(e.toString()));
  }
}

export default function* componentSaga() {
  yield all([disableAlertingWatch(), enableAlertingWatch()]);
}
