import { call, fork, takeLatest } from 'redux-saga/effects';
import {
  createSocketChannel,
  createMessageChannel,
  actionFromChannel,
} from '../state-utils/streaming';

import { subscribePodsForApp } from '../../api/pods';

import streamActionTypes from '../streaming/action-types';
import actionCreators from './action-creators';

let socket;

export default function* streamSecrets() {
  yield takeLatest(streamActionTypes.STREAM_REQUEST_CONNECTION, connectSaga);
  yield takeLatest(streamActionTypes.STREAM_REQUEST_DISCONNECT, disconnectSaga);
}

function* disconnectSaga(disconnectAction) {
  if (disconnectAction.streamKey === 'pods') {
    yield call(() => socket.close());
  }
}

function* connectSaga(connectAction) {
  if (connectAction.streamKey !== 'pods') {
    yield null;
  }

  socket = yield call(subscribePodsForApp, connectAction.app);
  const podsSocketChannel = yield call(createSocketChannel, socket, 'pods');

  const podsMessageChannel = yield call(
    createMessageChannel,
    socket,
    actionFromPodsMessage
  );

  yield fork(actionFromChannel, podsSocketChannel);
  yield fork(actionFromChannel, podsMessageChannel);
}

function actionFromPodsMessage(message) {
  switch (message.type) {
    case 'ADDED':
    case 'MODIFIED':
      return actionCreators.addToList(message.object);
    case 'DELETED':
      return actionCreators.removeFromList();
    default:
      console.warn('Unknown pods subscription message type', message);
  }
}
