import { call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { createApp } from '../../api/apps';

function* watchAppActions() {
  yield takeLatest(actionTypes.APPS_ADD_REQUEST, requestCreateApp);
}

export function* requestCreateApp(action) {
  try {
    const createdApp = yield call(createApp, action.app);
    yield put(actionCreators.addAppConfirm(createdApp));
  } catch (e) {
    yield put(actionCreators.addAppFail(e.toString()));
  }
}

export default function*() {
  yield watchAppActions();
}
