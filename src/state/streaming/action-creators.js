import actionTypes from './action-types';

export const requestConnection = streamKey => ({
  type: actionTypes.STREAM_REQUEST_CONNECTION,
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
