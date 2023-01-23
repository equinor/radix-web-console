import { all, call, put, takeLatest } from 'redux-saga/effects';

import { makeActionCreator } from '../state-utils/action-creators';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';

export const stopSagaFactory = <T>(
  actionPrefix: string,
  actions: Record<string, ReturnType<typeof makeActionCreator>>,
  api: (action: ReturnType<ReturnType<typeof makeActionCreator>>['meta']) => T
) => {
  function* stopWatch() {
    yield takeLatest(`${actionPrefix}_STOP_REQUEST`, stopFlow);
  }

  function* stopFlow(action: ReturnType<ReturnType<typeof makeActionCreator>>) {
    try {
      const stopResponse: T = yield call(api, action.meta);
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
