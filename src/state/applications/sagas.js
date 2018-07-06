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
  yield take(authActionTypes.AUTH_LOGIN_SUCCESS);

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

// ---- Brigade workers streaming ----------------------------------------------

function actionFromJobsMessage(message) {
  // Filter for Brigade worker pods only

  if (!/^brigade-worker-/.test(message.object.metadata.name)) {
    return;
  }

  // The pod has a label "project", which is the string "brigade-" and the rest
  // is a short version of the SHA256 of the application name (with the string
  // "Statoil/" prepended)

  const appShortSha = message.object.metadata.labels.project.substr(8, 54);

  switch (message.type) {
    case 'ADDED':
    case 'MODIFIED':
      return actionCreators.setAppBuildStatus(
        appShortSha,
        message.object.status.phase,
        message.object.metadata.creationTimestamp
      );
    case 'DELETED':
      return actionCreators.setAppBuildStatus(appShortSha, 'Idle');
    default:
      console.warn('Unknown jobs subscription message type', message);
  }
}

export function* streamJobs() {
  yield take(authActionTypes.AUTH_LOGIN_SUCCESS);

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
