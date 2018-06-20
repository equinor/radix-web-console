import { eventChannel, END } from 'redux-saga';
import { call, take, put, fork } from 'redux-saga/effects';

import * as actionCreators from './action-creators';
import * as appActionCreators from '../applications/action-creators';
import { subscribeAppsList } from '../../api/apps';
import authActionTypes from '../auth/action-types';

function createSocketChannel(socket, stateKey) {
  return eventChannel(emit => {
    socket.onopen = () => emit(actionCreators.confirmConnected(stateKey));
    socket.ondisconnect = () => emit(actionCreators.markDisconnected(stateKey));
    socket.onclose = () => emit(END);
    return () => socket.close();
  });
}

function createMessageChannel(stream) {
  return eventChannel(emit => {
    let listening = true;
    stream.onAppsMessage = message => listening && emit(handleMessage(message));
    return () => (listening = false);
  });
}

function handleMessage(message) {
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
  const appsMessageChannel = yield call(createMessageChannel, socket);

  yield fork(actionFromChannel, appsSocketChannel);
  yield fork(actionFromChannel, appsMessageChannel);
}

function* actionFromChannel(channel) {
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
