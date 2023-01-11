import { push } from 'connected-react-router';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { actions } from './action-creators';
import { actionTypes } from './action-types';

import { ActionType } from '../state-utils/action-creators';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';
import { AppModifyProps, deleteApp, modifyApp } from '../../api/apps';
import { routes } from '../../routes';

function* watchAppActions() {
  yield takeLatest(actionTypes.APP_DELETE_REQUEST, requestDeleteApp);
  yield takeLatest(actionTypes.APP_MODIFY_REQUEST, requestModifyApp);
  yield takeLatest(actionTypes.APP_CHANGE_ADMIN, changeAdmin);
}

export function* requestDeleteApp(action: ActionType<never, { id: string }>) {
  try {
    yield call(deleteApp, action.meta.id);
    yield put(actions.deleteAppConfirm(action.meta.id));
    yield put(push(routes.home));
  } catch (e) {
    yield put(actions.deleteAppFail(action.meta.id, e.message));
  }
}

export function* requestModifyApp(
  action: ActionType<never, { id: string; registration: AppModifyProps }>
) {
  try {
    yield call(modifyApp, action.meta.id, action.meta.registration);
    yield put(actions.modifyAppConfirm(action.meta.id));
    // Trigger a refresh of all subscribed data
    yield put(subscriptionsRefreshRequest());
  } catch (e) {
    yield put(actions.modifyAppFail(action.meta.id, e.message));
  }
}

export function* changeAdmin(
  action: ActionType<never, { id: string; adGroupConfig: AppModifyProps }>
) {
  yield put(
    actions.modifyAppRequest(action.meta.id, { ...action.meta.adGroupConfig })
  );
}

export default function* applicationSaga() {
  yield all([watchAppActions()]);
}
