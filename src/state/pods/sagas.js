import { call, fork, takeLatest } from 'redux-saga/effects';
import {
  createSocketChannel,
  createMessageChannel,
  actionFromChannel,
} from '../state-utils/streaming';

import { subscribePodsForComponent } from '../../api/pods';

import streamActionTypes from '../streaming/action-types';
import actionCreators from './action-creators';

let socket;

export default function* streamComponentPods() {
  yield takeLatest(
    action =>
      action.type === streamActionTypes.STREAM_REQUEST_CONNECTION &&
      action.streamKey === 'pods',
    connectSaga
  );
  yield takeLatest(
    action =>
      action.type === streamActionTypes.STREAM_REQUEST_DISCONNECT &&
      action.streamKey === 'pods',
    disconnectSaga
  );
}

function* disconnectSaga(disconnectAction) {
  if (disconnectAction.streamKey === 'pods') {
    yield call(() => socket.close());
  }
}

function* connectSaga(connectAction) {
  socket = yield call(
    subscribePodsForComponent,
    connectAction.appName,
    connectAction.componentName
  );
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
