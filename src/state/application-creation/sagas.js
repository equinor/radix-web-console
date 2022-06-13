import { call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { createApp } from '../../api/apps';

function* createAppWatch() {
  yield takeLatest(actionTypes.APP_CREATION_REQUEST, createAppFlow);
}

export function* createAppFlow(action) {
  try {
    const createdApp = yield call(createApp, action.meta.app);
    yield put(actionCreators.addAppConfirm(createdApp));
  } catch (e) {
    yield put(actionCreators.addAppFail(e.toString()));
  }
}

export default function* createApplicationSaga() {
  yield createAppWatch();
}
