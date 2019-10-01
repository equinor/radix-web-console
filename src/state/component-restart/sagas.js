import { call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { restartComponent } from '../../api/component';

function* restartComponentWatch() {
  yield takeLatest(actionTypes.COMPONENT_RESTART_REQUEST, restartComponentFlow);
}

export function* restartComponentFlow(action) {
  try {
    const restartedComponent = yield call(restartComponent, action.job);
    yield put(actionCreators.restartComponentConfirm(restartedComponent));
  } catch (e) {
    yield put(actionCreators.restartComponentFail(e.toString()));
  }
}

export default function*() {
  yield restartComponentWatch();
}
