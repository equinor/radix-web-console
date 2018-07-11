import { all, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import * as actionCreators from './action-creators';

import { getText } from '../../api/api-helpers';

export function* watchRequestFetchLog() {
  yield takeLatest(actionTypes.UPDATE_LOG_REQUEST, fetchLog);
}

export function* fetchLog(action) {
  //TODO: Use function helpers to get name etc.
  let podname = action.pod.metadata.name;
  let podnamespace = action.pod.metadata.namespace;
  let link = 'namespaces/' + podnamespace + '/pods/' + podname + '/log';
  let log = yield getText(link, 'radix_dev_playground_k8s');

  yield put(actionCreators.commitFetchLog(log));
}

export default function*() {
  yield all([watchRequestFetchLog(), fetchLog]);
}
