import { all, call, put, takeLatest } from 'redux-saga/effects';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';

export const startSagaFactory = (actionPrefix, actions, api) => {
  function* startWatch() {
    yield takeLatest(`${actionPrefix}_START_REQUEST`, startFlow);
  }

  function* startFlow(action) {
    try {
      const startResponse = yield call(api, action);
      yield put(actions.startConfirm(startResponse));
      yield put(subscriptionsRefreshRequest());
    } catch (e) {
      yield put(actions.startFail(e.toString()));
    }
  }

  function* startSaga() {
    yield all([startWatch()]);
  }

  return {
    startSaga,
    startWatch,
  };
};
