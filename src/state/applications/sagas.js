import { call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import * as actionCreators from './action-creators';
import { createApp } from '../../api/apps';

export default function* watchAppActions() {
  yield takeLatest(actionTypes.APPS_ADD_REQUEST, requestCreateApp);
}

export function* requestCreateApp(action) {
  try {
    yield call(createApp, action.request);
    yield put(actionCreators.confirmCreateApp());
  } catch (e) {
    yield put(actionCreators.failCreateApp());
  }
}
