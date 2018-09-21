import { call, put, takeLatest } from 'redux-saga/effects';

import { getLog } from '../../api/jobs';
import actionTypes from './action-types';
import { jobLogConfirm, jobLogFail } from './action-creators';

export default function* watchRequestFetchLog() {
  yield takeLatest(actionTypes.JOB_LOGS_REQUEST, fetchLog);
}

export function* fetchLog(action) {
  try {
    const log = yield call(
      getLog,
      action.job.metadata.name,
      action.job.metadata.namespace
    );

    yield put(jobLogConfirm(log));
  } catch (e) {
    yield put(jobLogFail(e.message));
  }
}
