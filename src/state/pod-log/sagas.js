import { put, takeLatest } from 'redux-saga/effects';

import { getLog } from '../../api/pods';
import actionTypes from './action-types';
import actionCreators from './action-creators';

export default function* watchRequestFetchLog() {
  yield takeLatest(actionTypes.POD_LOGS_REQUEST, fetchLog);
}

export function* fetchLog(action) {
  const log = yield getLog(
    action.pod.metadata.name,
    action.pod.metadata.namespace
  );

  yield put(actionCreators.podLogConfirm(log));
}
