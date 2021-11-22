import { all, call, put, takeLatest } from 'redux-saga/effects';

export const alertingSagaFactory = (actionPrefix, actions, api) => {
  function* disableAlertingWatch() {
    yield takeLatest(`${actionPrefix}_DISABLE_REQUEST`, disableAlertingFlow);
  }

  function* disableAlertingFlow(action) {
    try {
      const alertingConfig = yield call(api.disableAlerting, action);
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

  function* enableAlertingFlow(action) {
    try {
      const alertingConfig = yield call(api.enableAlerting, action);
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

  function* updateAlertingFlow(action) {
    try {
      const alertingConfig = yield call(api.updateAlerting, action);
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
