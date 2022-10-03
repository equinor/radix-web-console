import { push } from 'connected-react-router';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';

import * as appApi from '../../api/apps';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';
import routes from '../../routes';

function* watchAppActions() {
  yield takeLatest(actionTypes.APP_DELETE_REQUEST, requestDeleteApp);
  yield takeLatest(actionTypes.APP_MODIFY_REQUEST, requestModifyApp);
  yield takeLatest(actionTypes.APP_CHANGE_ADMIN, changeAdmin);
  yield takeLatest(actionTypes.APP_CHANGE_REPOSITORY, changeRepository);
}

export function* requestDeleteApp(action) {
  try {
    yield call(appApi.deleteApp, action.meta.id);
    yield put(actionCreators.deleteAppConfirm(action.meta.id));
    yield put(push(routes.home));
  } catch (e) {
    yield put(actionCreators.deleteAppFail(action.meta.id, e.message));
  }
}

export function* requestModifyApp(action) {
  try {
    const appRegistrationUpdateResult = yield call(
      appApi.modifyApp,
      action.meta.id,
      action.meta.registration
    );
    yield put(actionCreators.modifyAppConfirm(appRegistrationUpdateResult));
    // Trigger a refresh of all subscribed data
    yield put(subscriptionsRefreshRequest());
  } catch (e) {
    yield put(actionCreators.modifyAppFail(action.meta.id, e.message));
  }
}

export function* changeAdmin(action) {
  const newRegistration = Object.assign({}, action.meta.adGroupConfig);
  yield put(actionCreators.modifyAppRequest(action.meta.id, newRegistration));
}

export function* changeRepository(action) {
  const newRegistration = Object.assign({}, action.meta.repositoryConfig);
  yield put(actionCreators.modifyAppRequest(action.meta.id, newRegistration));
}

export default function* applicationSaga() {
  yield all([watchAppActions()]);
}
