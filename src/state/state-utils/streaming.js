import { eventChannel, END } from 'redux-saga';
import { take, put } from 'redux-saga/effects';

import * as actionCreators from '../streaming/action-creators';

/**
 * Create a redux-saga channel to listen to connections/disconnection on a streaming socket
 * @param {WebSocket} socket The communication socket
 * @param {string} stateKey Key in the Redux state tree (within "streaming") that tracks state for this socket
 */
export function createSocketChannel(socket, stateKey) {
  return eventChannel(emit => {
    socket.onopen = () => emit(actionCreators.confirmConnected(stateKey));
    socket.ondisconnect = () => emit(actionCreators.markDisconnected(stateKey));
    socket.onclose = () => {
      emit(actionCreators.markDisconnected(stateKey));
      emit(END);
    };
    return () => socket.close();
  });
}

/**
 * Create a redux-saga channel to listen to messages on a streaming socket
 * NOTE: The socket (provided by the API) must have a `registerListener` method
 * @param {StreamingWebSocket} socket The communication socket
 * @param {function} messageHandler Handler for messages; return value is emitted into the channel
 */
export function createMessageChannel(socket, messageHandler) {
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
export function* actionFromChannel(channel) {
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
