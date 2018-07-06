import { call, fork, take } from 'redux-saga/effects';
import {
  createSocketChannel,
  createMessageChannel,
  actionFromChannel,
} from '../state-utils/streaming';

import { subscribeSecretsForApp } from '../../api/secrets';

import streamActionTypes from '../streaming/action-types';
import actionCreators from './action-creators';

export default function* streamSecrets() {
  while (true) {
    const connectAction = yield take(
      streamActionTypes.STREAM_REQUEST_CONNECTION
    );

    if (connectAction.streamKey !== 'secrets') {
      return;
    }

    console.log('took 2');

    const socketSecrets = yield call(subscribeSecretsForApp, connectAction.app);

    const secretsSocketChannel = yield call(
      createSocketChannel,
      socketSecrets,
      'secrets'
    );

    const secretsMessageChannel = yield call(
      createMessageChannel,
      socketSecrets,
      actionFromSecretsMessage
    );

    yield fork(actionFromChannel, secretsSocketChannel);
    yield fork(actionFromChannel, secretsMessageChannel);

    const disconnectAction = yield take(
      streamActionTypes.STREAM_REQUEST_DISCONNECT
    );

    if (disconnectAction.streamKey === 'secrets') {
      socketSecrets.close();
    }
  }
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
