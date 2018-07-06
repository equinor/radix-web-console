import { call, fork, take } from 'redux-saga/effects';
import {
  createSocketChannel,
  createMessageChannel,
  actionFromChannel,
} from '../state-utils/streaming';

import { subscribePodsForApp } from '../../api/pods';

import streamActionTypes from '../streaming/action-types';
import actionCreators from './action-creators';

export default function* streamPods() {
  while (true) {
    const connectAction = yield take(
      streamActionTypes.STREAM_REQUEST_CONNECTION
    );

    if (connectAction.streamKey !== 'pods') {
      return;
    }
    console.log('took 1');
    const socketPods = yield call(subscribePodsForApp, connectAction.app);

    const podsSocketChannel = yield call(
      createSocketChannel,
      socketPods,
      'pods'
    );

    const podsMessageChannel = yield call(
      createMessageChannel,
      socketPods,
      actionFromPodsMessage
    );

    yield fork(actionFromChannel, podsSocketChannel);
    yield fork(actionFromChannel, podsMessageChannel);

    const disconnectAction = yield take(
      streamActionTypes.STREAM_REQUEST_DISCONNECT
    );

    if (disconnectAction.streamKey === 'pods') {
      socketPods.close();
    }
  }
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
