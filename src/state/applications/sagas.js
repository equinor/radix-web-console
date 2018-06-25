import { call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import * as actionCreators from './action-creators';
import { createApp, deleteApp } from '../../api/apps';

export default function* watchAppActions() {
  yield takeLatest(actionTypes.APPS_ADD_REQUEST, requestCreateApp);
  yield takeLatest(actionTypes.APPS_DELETE_REQUEST, requestDeleteApp);
}

export function* requestCreateApp(action) {
  try {
    yield call(createApp, action.request);
    yield put(actionCreators.confirmCreateApp());
  } catch (e) {
    yield put(actionCreators.failCreateApp());
  }
}

export function* requestDeleteApp(action) {
  try {
    yield call(deleteApp, action.appName);
    yield put(actionCreators.confirmDeleteApp(action.appName));
  } catch (e) {
    yield put(actionCreators.failDeleteApp(action.appName));
  }
}
