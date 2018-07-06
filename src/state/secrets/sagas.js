import { call, fork, takeLatest } from 'redux-saga/effects';
import {
  createSocketChannel,
  createMessageChannel,
  actionFromChannel,
} from '../state-utils/streaming';

import { subscribeSecretsForApp } from '../../api/secrets';

import streamActionTypes from '../streaming/action-types';
import actionCreators from './action-creators';

let socket;

export default function* streamSecrets() {
  yield takeLatest(streamActionTypes.STREAM_REQUEST_CONNECTION, connectSaga);
  yield takeLatest(streamActionTypes.STREAM_REQUEST_DISCONNECT, disconnectSaga);
}

function* disconnectSaga(action) {
  if (action.streamKey === 'secrets') {
    yield call(() => socket.close());
  }
}
function* connectSaga(action) {
  if (action.streamKey !== 'secrets') {
    yield null;
  }

  socket = yield call(subscribeSecretsForApp, action.app);
  const secretsSocketChannel = yield call(
    createSocketChannel,
    socket,
    'secrets'
  );

  const secretsMessageChannel = yield call(
    createMessageChannel,
    socket,
    actionFromSecretsMessage
  );

  yield fork(actionFromChannel, secretsSocketChannel);
  yield fork(actionFromChannel, secretsMessageChannel);
}

function actionFromSecretsMessage(message) {
  switch (message.type) {
    case 'ADDED':
    case 'MODIFIED':
      return actionCreators.addToList(message.object);
    case 'DELETED':
      return actionCreators.removeFromList();
    default:
      console.warn('Unknown secrets subscription message type', message);
  }
}
