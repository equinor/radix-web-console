import { call, put, takeLatest } from 'redux-saga/effects';

import { actions } from './action-creators';
import { actionTypes } from './action-types';

import { ActionType } from '../state-utils/action-creators';
import { createJob } from '../../api/jobs';
import { JobModel } from '../../models/job';

function* createJobWatch() {
  yield takeLatest(actionTypes.JOB_CREATION_REQUEST, createJobFlow);
}

export function* createJobFlow(
  action: ActionType<never, { job: Parameters<typeof createJob>[0] }>
) {
  try {
    const createdJob: JobModel = yield call(createJob, action.meta.job);
    yield put(actions.addJobConfirm(createdJob));
  } catch (e) {
    yield put(actions.addJobFail(e.toString()));
  }
}

export default function* createJobSaga() {
  yield createJobWatch();
}
