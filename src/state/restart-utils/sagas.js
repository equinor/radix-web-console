import { all, call, put, takeLatest } from 'redux-saga/effects';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';

export const restartSagaFactory = (actionPrefix, actions, api) => {
  function* restartWatch() {
    yield takeLatest(`${actionPrefix}_RESTART_REQUEST`, restartFlow);
  }

  function* restartFlow(action) {
    try {
      const restartedComponent = yield call(api, action);
      yield put(actions.restartConfirm(restartedComponent));
      yield put(subscriptionsRefreshRequest());
    } catch (e) {
      yield put(actions.restartFail(e.toString()));
    }
  }

  function* restartSaga() {
    yield all([restartWatch()]);
  }

  return {
    restartSaga,
    restartWatch,
  };
};
