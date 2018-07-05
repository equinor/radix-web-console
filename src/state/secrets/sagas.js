import { call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { createApp, deleteApp } from '../../api/apps';

export default function* watchAppActions() {
  yield takeLatest(actionTypes.APPS_ADD_REQUEST, requestCreateApp);
  yield takeLatest(actionTypes.APPS_DELETE_REQUEST, requestDeleteApp);
}

export function* requestCreateApp(action) {
  try {
    yield call(createApp, action.app);
    yield put(actionCreators.addAppConfirm());
  } catch (e) {
    yield put(actionCreators.addAppFail(e.toString()));
  }
}

export function* requestDeleteApp(action) {
  try {
    yield call(deleteApp, action.id);
    yield put(actionCreators.deleteAppConfirm(action.id));
  } catch (e) {
    yield put(actionCreators.deleteAppFail(action.id));
  }
}
