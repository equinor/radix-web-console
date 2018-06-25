import { eventChannel, END } from 'redux-saga';
import { all, call, take, put, fork } from 'redux-saga/effects';

import * as actionCreators from './action-creators';
import authActionTypes from '../auth/action-types';

import * as appActionCreators from '../applications/action-creators';
import { subscribeRadixJobs } from '../../api/jobs';
import {
  subscribeRadixRegistrations,
  subscribeRadixApplications,
} from '../../api/apps';

// ---- Generic streaming methods ----------------------------------------------

/**
 * Create a redux-saga channel to listen to connections/disconnection on a streaming socket
 * @param {WebSocket} socket The communication socket
 * @param {string} stateKey Key in the Redux state tree (within "streaming") that tracks state for this socket
 */
function createSocketChannel(socket, stateKey) {
  return eventChannel(emit => {
    socket.onopen = () => emit(actionCreators.confirmConnected(stateKey));
    socket.ondisconnect = () => emit(actionCreators.markDisconnected(stateKey));
    socket.onclose = () => emit(END);
    return () => socket.close();
  });
}

/**
 * Create a redux-saga channel to listen to messages on a streaming socket
 * NOTE: The socket (provided by the API) must have a `registerListener` method
 * @param {StreamingWebSocket} socket The communication socket
 * @param {function} messageHandler Handler for messages; return value is emitted into the channel
 */
function createMessageChannel(socket, messageHandler) {
  return eventChannel(emit => {
    const listener = socketMessage => {
      const parsedMessage = messageHandler(socketMessage);
      if (parsedMessage) {
        emit(parsedMessage);
      }
    };
    return socket.registerListener(listener);
  });
}

/**
 * Redux-saga effect creator: listens to a channel, expecting Redux actions to
 * be emitted, and dispatches those actions. This effect is expected to have
 * been `fork()`ed
 * @param {EventChannel} channel A redux-saga channel to listen to
 */
function* actionFromChannel(channel) {
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

// ---- Applications streaming -------------------------------------------------

function actionFromAppsMessage(message) {
  switch (message.type) {
    case 'ADDED':
      return appActionCreators.addAppToList(message.object);
    case 'DELETED':
      return appActionCreators.deleteAppFromList(message.object);
    // case 'UPDATED':
    //   return appActionCreators.updateAppInList(message.object);
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
      return appActionCreators.setAppBuildStatus(
        appShortSha,
        message.object.status.phase,
        message.object.metadata.creationTimestamp
      );
    case 'DELETED':
      return appActionCreators.setAppBuildStatus(appShortSha, 'Idle');
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
  yield all([streamApps(), streamJobs()]);
}
