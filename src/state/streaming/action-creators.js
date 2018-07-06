import actionTypes from './action-types';

export const requestConnection = (streamKey, ...rest) => ({
  type: actionTypes.STREAM_REQUEST_CONNECTION,
  streamKey,
  ...rest,
});

export const disconnect = streamKey => ({
  type: actionTypes.STREAM_REQUEST_DISCONNECT,
  streamKey,
});

export const confirmConnected = streamKey => ({
  type: actionTypes.STREAM_CONNECT,
  streamKey,
});

export const markDisconnected = streamKey => ({
  type: actionTypes.STREAM_DISCONNECT,
  streamKey,
});
