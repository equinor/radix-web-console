import { all, call, put, takeLatest } from 'redux-saga/effects';

export const alertingSaga = (actionPrefix, actions, api) => {
  function* disableAlertingWatch() {
    yield takeLatest(`${actionPrefix}_DISABLE_REQUEST`, disableAlertingFlow);
  }

  function* disableAlertingFlow(action) {
    try {
      const disableAlerting = yield call(api.disableAlerting, action);
      yield put(actions.disableAlertingConfirm(disableAlerting));
      yield put(actions.setAlertingSnapshot(disableAlerting));
    } catch (e) {
      yield put(actions.disableAlertingFail(e.toString()));
    }
  }

  function* enableAlertingWatch() {
    yield takeLatest(`${actionPrefix}_ENABLE_REQUEST`, enableAlertingFlow);
  }

  function* enableAlertingFlow(action) {
    try {
      const enabledAlerting = yield call(api.enableAlerting, action);
      yield put(actions.enableAlertingConfirm(enabledAlerting));
      yield put(actions.setAlertingSnapshot(enabledAlerting));
    } catch (e) {
      yield put(actions.enableAlertingFail(e.toString()));
    }
  }

  function* updateAlertingWatch() {
    yield takeLatest(`${actionPrefix}_UPDATE_REQUEST`, updateAlertingFlow);
  }

  function* updateAlertingFlow(action) {
    try {
      const updatedAlerting = yield call(api.updateAlerting, action);
      yield put(actions.updateAlertingConfirm(updatedAlerting));
      yield put(actions.setAlertingSnapshot(updatedAlerting));
    } catch (e) {
      yield put(actions.updateAlertingFail(e.toString()));
    }
  }

  function* componentSaga() {
    yield all([
      disableAlertingWatch(),
      enableAlertingWatch(),
      updateAlertingWatch(),
    ]);
  }

  return componentSaga;
};
