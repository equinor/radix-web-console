import { all, call, put, takeLatest } from 'redux-saga/effects';

import { alertingActions } from './action-creators';

import { ActionType } from '../state-utils/action-creators';
import { api as applicationApi } from '../../api/application-alerting';
import { api as environmentApi } from '../../api/environment-alerting';
import { UpdateAlertingConfigModel } from '../../models/radix-api/alerting/update-alerting-config';

export const alertingSagaFactory = (
  actionPrefix: string,
  actions: ReturnType<typeof alertingActions>,
  api: typeof applicationApi | typeof environmentApi
) => {
  function* disableAlertingWatch() {
    yield takeLatest(`${actionPrefix}_DISABLE_REQUEST`, disableAlertingFlow);
  }

  function* disableAlertingFlow(
    action: ActionType<
      never,
      { appName: string } | { appName: string; envName: string }
    >
  ) {
    try {
      const alertingConfig: Awaited<ReturnType<typeof api.disableAlerting>> =
        yield call(api.disableAlerting, action.meta);
      yield put(actions.disableAlertingConfirm(alertingConfig));
      yield put(actions.setAlertingSnapshot(alertingConfig));
      yield put(actions.editAlertingDisable());
    } catch (e) {
      yield put(actions.disableAlertingFail(e.message ?? e.toString()));
    }
  }

  function* enableAlertingWatch() {
    yield takeLatest(`${actionPrefix}_ENABLE_REQUEST`, enableAlertingFlow);
  }

  function* enableAlertingFlow(
    action: ActionType<
      never,
      { appName: string } | { appName: string; envName: string }
    >
  ) {
    try {
      const alertingConfig: Awaited<ReturnType<typeof api.enableAlerting>> =
        yield call(api.enableAlerting, action.meta);
      yield put(actions.enableAlertingConfirm(alertingConfig));
      yield put(actions.setAlertingSnapshot(alertingConfig));
      if (alertingConfig.ready) {
        yield put(actions.editAlertingEnable(alertingConfig));
      }
    } catch (e) {
      yield put(actions.enableAlertingFail(e.message ?? e.toString()));
    }
  }

  function* updateAlertingWatch() {
    yield takeLatest(`${actionPrefix}_UPDATE_REQUEST`, updateAlertingFlow);
  }

  function* updateAlertingFlow(
    action: ActionType<
      never,
      | { appName: string; request: UpdateAlertingConfigModel }
      | { appName: string; envName: string; request: UpdateAlertingConfigModel }
    >
  ) {
    try {
      const alertingConfig: Awaited<ReturnType<typeof api.updateAlerting>> =
        yield call(api.updateAlerting, action.meta);
      yield put(actions.updateAlertingConfirm(alertingConfig));
      yield put(actions.setAlertingSnapshot(alertingConfig));
      yield put(actions.editAlertingDisable());
    } catch (e) {
      yield put(actions.updateAlertingFail(e.message ?? e.toString()));
    }
  }

  function* alertingSaga() {
    yield all([
      disableAlertingWatch(),
      enableAlertingWatch(),
      updateAlertingWatch(),
    ]);
  }

  return {
    alertingSaga,
    enableAlertingFlow,
    disableAlertingFlow,
    updateAlertingFlow,
  };
};
