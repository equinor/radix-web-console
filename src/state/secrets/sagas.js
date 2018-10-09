import { call, fork, takeLatest, put } from 'redux-saga/effects';
import {
  createSocketChannel,
  createMessageChannel,
  actionFromChannel,
} from '../state-utils/streaming';

import { subscribeSecretsForApp, saveComponentSecret } from '../../api/secrets';

import streamActionTypes from '../streaming/action-types';
import actionCreators from './action-creators';
import actionTypes from './action-types';

let socket;

export default function* streamSecrets() {
  yield takeLatest(
    action =>
      action.type === streamActionTypes.STREAM_REQUEST_CONNECTION &&
      action.streamKey === 'secrets',
    connectSaga
  );
  yield takeLatest(
    action =>
      action.type === streamActionTypes.STREAM_REQUEST_DISCONNECT &&
      action.streamKey === 'secrets',
    disconnectSaga
  );
  yield takeLatest(actionTypes.SECRETS_SAVE_REQUEST, saveSecret);
}

// --- Creation ----------------------------------------------------------------

export function* saveSecret(action) {
  try {
    yield call(
      saveComponentSecret,
      action.namespace,
      action.componentName,
      action.secret
    );
    yield put(actionCreators.saveConfirm());
  } catch (e) {
    yield put(actionCreators.saveFail(e.toString()));
  }
}

// --- Streaming ---------------------------------------------------------------

function* disconnectSaga() {
  yield call(() => socket && socket.close());
}

function* connectSaga(action) {
  socket = yield call(
    subscribeSecretsForApp,
    action.appName,
    action.envName,
    action.componentName
  );

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
      return actionCreators.removeFromList(message.object.metadata.name);
    default:
      console.warn('Unknown secrets subscription message type', message);
  }
}
