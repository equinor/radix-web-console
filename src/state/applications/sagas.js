import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import authActionTypes from '../auth/action-types';
import { createApp, deleteApp } from '../../api/apps';
import {
  subscribeRadixRegistrations,
  subscribeRadixApplications,
} from '../../api/apps';
import {
  createSocketChannel,
  createMessageChannel,
  actionFromChannel,
} from '../state-utils/streaming';

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
  } catch (e) {
    yield put(actionCreators.deleteAppFail(action.id));
  }
}

function actionFromAppsMessage(message) {
  switch (message.type) {
    case 'ADDED':
      return actionCreators.addAppToList(message.object);
    case 'DELETED':
      return actionCreators.deleteAppFromList(message.object);
    // case 'UPDATED':
    //   return actionCreators.updateAppInList(message.object);
    default:
      console.warn('Unknown apps subscription message type', message);
  }
}

export function* streamApps() {
  yield take(authActionTypes.AUTH_LOGIN_SUCCESS); // TODO: This is the wrong signal to start streaming; causes tests to have side-effects

  const socketRegistrations = yield call(subscribeRadixRegistrations);

  const registrationsSocketChannel = yield call(
    createSocketChannel,
    socketRegistrations,
    'apps'
  );
  const registrationsMessageChannel = yield call(
    createMessageChannel,
    socketRegistrations,
    actionFromAppsMessage
  );

  yield fork(actionFromChannel, registrationsSocketChannel);
  yield fork(actionFromChannel, registrationsMessageChannel);

  const socketApps = yield call(subscribeRadixApplications);

  const appsSocketChannel = yield call(createSocketChannel, socketApps, 'apps');
  const appsMessageChannel = yield call(
    createMessageChannel,
    socketApps,
    actionFromAppsMessage
  );

  yield fork(actionFromChannel, appsSocketChannel);
  yield fork(actionFromChannel, appsMessageChannel);
}

export default function*() {
  yield all([watchAppActions(), streamApps()]);
}
