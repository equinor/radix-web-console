import { all, call, put, takeLatest } from 'redux-saga/effects';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';

export const stopSagaFactory = (actionPrefix, actions, api) => {
  function* stopWatch() {
    yield takeLatest(`${actionPrefix}_STOP_REQUEST`, stopFlow);
  }

  function* stopFlow(action) {
    try {
      const stopResponse = yield call(api, action);
      yield put(actions.stopConfirm(stopResponse));
      yield put(subscriptionsRefreshRequest());
    } catch (e) {
      yield put(actions.stopFail(e.toString()));
    }
  }

  function* stopSaga() {
    yield all([stopWatch()]);
  }

  return {
    stopSaga,
    stopWatch,
  };
};
