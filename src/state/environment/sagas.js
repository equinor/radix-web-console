import { all, call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { deleteEnvironment } from '../../api/env';

function* watchEnvironmentActions() {
  yield takeLatest(
    actionTypes.ENVIRONMENT_DELETE_REQUEST,
    createDeleteEnvironmentFlow
  );
}

export function* createDeleteEnvironmentFlow(action) {
  try {
    yield call(deleteEnvironment, action.env);
    yield put(actionCreators.deleteEnvConfirm(action));
  } catch (e) {
    yield put(actionCreators.deleteEnvFail(e));
  }
}

export default function*() {
  yield all([watchEnvironmentActions()]);
}
