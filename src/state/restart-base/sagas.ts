import { all, call, put, takeLatest } from 'redux-saga/effects';
import { makeActionCreator } from '../state-utils/action-creators';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';

export const restartSagaFactory = <T>(
  actionPrefix: string,
  actions: Record<string, ReturnType<typeof makeActionCreator>>,
  api: (action: ReturnType<ReturnType<typeof makeActionCreator>>['meta']) => T
) => {
  function* restartWatch() {
    yield takeLatest(`${actionPrefix}_RESTART_REQUEST`, restartFlow);
  }

  function* restartFlow(
    action: ReturnType<ReturnType<typeof makeActionCreator>>
  ) {
    try {
      const restartResponse: T = yield call(api, action.meta);
      yield put(actions.restartConfirm(restartResponse));
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
