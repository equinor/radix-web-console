import update from 'immutability-helper';

import actionTypes from './action-types';
import connectionStatus from './connection-status';

const initialState = {
  apps: connectionStatus.DISCONNECTED,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STREAM_REQUEST_CONNECTION:
      return update(state, {
        [action.streamKey]: { $set: connectionStatus.CONNECTING },
      });

    case actionTypes.STREAM_CONNECT:
      return update(state, {
        [action.streamKey]: { $set: connectionStatus.CONNECTED },
      });

    case actionTypes.STREAM_DISCONNECT:
      return update(state, {
        [action.streamKey]: { $set: connectionStatus.DISCONNECTED },
      });

    default:
      return state;
  }
};
