import { put, takeLatest } from 'redux-saga/effects';

import { getLog } from '../../api/jobs';
import actionTypes from './action-types';
import { buildLogConfirm } from './action-creators';

export default function* watchRequestFetchLog() {
  yield takeLatest(actionTypes.BUILD_LOGS_REQUEST, fetchLog);
}

export function* fetchLog(action) {
  const log = yield getLog(
    action.job.metadata.name,
    action.job.metadata.namespace
  );

  yield put(buildLogConfirm(log));
}
