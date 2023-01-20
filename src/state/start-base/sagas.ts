import { all, call, put, takeLatest } from 'redux-saga/effects';

import { makeActionCreator } from '../state-utils/action-creators';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';

export const startSagaFactory = <T>(
  actionPrefix: string,
  actions: Record<string, ReturnType<typeof makeActionCreator>>,
  api: (action: ReturnType<ReturnType<typeof makeActionCreator>>['meta']) => T
) => {
  function* startWatch() {
    yield takeLatest(`${actionPrefix}_START_REQUEST`, startFlow);
  }

  function* startFlow(
    action: ReturnType<ReturnType<typeof makeActionCreator>>
  ) {
    try {
      const startResponse: T = yield call(api, action.meta);
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
