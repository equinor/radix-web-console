import { all, call, fork, put, take, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import authActionTypes from '../auth/action-types';
import { createApp, deleteApp } from '../../api/apps';
import { subscribeRadixJobs } from '../../api/jobs';
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

// ---- Applications streaming -------------------------------------------------

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

// ---- Jobs streaming ---------------------------------------------------------

function actionFromJobsMessage(message) {
  // The pod has a label "build", which is the string
  // '[app name]-[5-letter-hash]'. We need the app name to update the correct
  // app's status, so we slice the label string.

  const appName = message.object.metadata.labels.build.slice(0, -6);

  switch (message.type) {
    case 'ADDED':
    case 'MODIFIED':
      return actionCreators.updateAppJobs(appName, message.object);
    default:
      console.warn('Unknown jobs subscription message type', message);
  }
}

export function* streamJobs() {
  yield take(authActionTypes.AUTH_LOGIN_SUCCESS); // TODO: This is the wrong signal to start streaming; causes tests to have side-effects

  const socketRegistrations = yield call(subscribeRadixJobs);

  const jobsSocketChannel = yield call(
    createSocketChannel,
    socketRegistrations,
    'jobs'
  );
  const jobsMessageChannel = yield call(
    createMessageChannel,
    socketRegistrations,
    actionFromJobsMessage
  );

  yield fork(actionFromChannel, jobsSocketChannel);
  yield fork(actionFromChannel, jobsMessageChannel);
}

// ---- Start all streaming sagas ----------------------------------------------

export default function*() {
  yield all([watchAppActions(), streamApps(), streamJobs()]);
}
