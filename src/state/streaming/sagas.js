import { eventChannel, END } from 'redux-saga';
import { call, take, put, fork } from 'redux-saga/effects';

import * as actionCreators from './action-creators';
import authActionTypes from '../auth/action-types';

import * as appActionCreators from '../applications/action-creators';
import { subscribeAppsList } from '../../api/apps';

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
    const listener = message => emit(messageHandler(message));
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
    // case 'DELETED':
    //   return appActionCreators.deleteAppFromList(message.object);
    // case 'UPDATED':
    //   return appActionCreators.updateAppInList(message.object);
    default:
      console.warn('Unknown apps subscription message type');
  }
}

export default function* streamApps() {
  yield take(authActionTypes.AUTH_LOGIN_SUCCESS);

  const socket = yield call(subscribeAppsList);
  const appsSocketChannel = yield call(createSocketChannel, socket, 'apps');
  const appsMessageChannel = yield call(
    createMessageChannel,
    socket,
    actionFromAppsMessage
  );

  yield fork(actionFromChannel, appsSocketChannel);
  yield fork(actionFromChannel, appsMessageChannel);
}
