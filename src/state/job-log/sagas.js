import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getLog } from '../../api/jobs';
import actionTypes from './action-types';
import { jobLogsConfirm, jobLogsFail } from './action-creators';

export default function* watchRequestFetchLog() {
  yield takeLatest(actionTypes.JOB_LOGS_REQUEST, fetchLog);
}

export function* fetchLog(action) {
  const jobName = action.job.metadata.name;
  const namespace = action.job.metadata.namespace;

  try {
    // call all() with an object with a key for each component, e.g.
    // yield all({
    //   component1: call(getLog, jobName, namespace, 'component1'),
    //   component2: call(getLog, jobName, namespace, 'component2'),
    //   component3: call(getLog, jobName, namespace, 'component3'),
    // })
    const componentLogs = yield all(
      action.components.reduce(
        (accumulator, componentName) => ({
          ...accumulator,
          [componentName]: call(getLog, jobName, namespace, componentName),
        }),
        {}
      )
    );

    yield put(jobLogsConfirm(componentLogs));
  } catch (e) {
    yield put(jobLogsFail(e.message));
  }
}
