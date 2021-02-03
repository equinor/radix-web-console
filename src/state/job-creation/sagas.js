import { call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { createJob } from '../../api/jobs';

function* createJobWatch() {
  yield takeLatest(actionTypes.JOB_CREATION_REQUEST, createJobFlow);
}

export function* createJobFlow(action) {
  try {
    const createdJob = yield call(createJob, action.job);
    yield put(actionCreators.addJobConfirm(createdJob));
  } catch (e) {
    yield put(actionCreators.addJobFail(e.toString()));
  }
}

export default function* createJobSaga() {
  yield createJobWatch();
}
