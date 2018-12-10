import { all, call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { createApp, deleteApp } from '../../api/apps';

function* watchAppActions() {
  yield takeLatest(actionTypes.APPS_ADD_REQUEST, requestCreateApp);
  yield takeLatest(actionTypes.APPS_DELETE_REQUEST, requestDeleteApp);
}

export function* requestCreateApp(action) {
  try {
    const createdApp = yield call(createApp, action.app);
    yield put(actionCreators.addAppConfirm(createdApp));
  } catch (e) {
    yield put(actionCreators.addAppFail(e.toString()));
  }
}

export function* requestDeleteApp(action) {
  try {
    yield call(deleteApp, action.id);
    yield put(actionCreators.deleteAppConfirm(action.id));
    // todo: route to /applications
  } catch (e) {
    yield put(actionCreators.deleteAppFail(action.id));
  }
}

export default function*() {
  yield all([watchAppActions()]);
}
