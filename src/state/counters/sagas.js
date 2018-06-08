import { delay } from 'redux-saga';
import { all, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import * as actionCreators from './action-creators';

export function* watchRequestAsyncIncrement() {
  yield takeLatest(
    actionTypes.COUNTERS_ASYNC_REQUEST_INCREMENT,
    fetchAsyncIncrement
  );
}

export function* fetchAsyncIncrement(action) {
  yield delay(1000);
  const howMuch = Math.round(Math.random() * 10);

  yield put(actionCreators.commitIncrementAsyncCounter(howMuch));
}

export default function*() {
  yield all([watchRequestAsyncIncrement(), fetchAsyncIncrement]);
}
