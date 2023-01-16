import { all, call, put, takeLatest } from 'redux-saga/effects';

import { actions } from './action-creators';
import { actionTypes } from './action-types';

import { ActionType } from '../state-utils/action-creators';
import { deleteEnvironment } from '../../api/env';

function* watchEnvironmentActions() {
  yield takeLatest(
    actionTypes.ENVIRONMENT_DELETE_REQUEST,
    createDeleteEnvironmentFlow
  );
}

export function* createDeleteEnvironmentFlow(
  action: ActionType<never, { env: { appName: string; envName: string } }>
) {
  try {
    yield call(deleteEnvironment, action.meta.env);
    yield put(actions.deleteEnvConfirm(action.meta.env));
  } catch (e) {
    yield put(actions.deleteEnvFail((e as Error).message));
  }
}

export default function* environmentSaga() {
  yield all([watchEnvironmentActions()]);
}
