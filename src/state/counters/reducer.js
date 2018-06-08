import update from 'immutability-helper';

import actionTypes from './action-types';

const initialState = {
  asyncCounter: 0,
  syncCounter: 0,
  updatingAsync: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COUNTERS_SYNC_INCREMENT:
      return update(state, { syncCounter: val => val + 1 });

    case actionTypes.COUNTERS_ASYNC_REQUEST_INCREMENT:
      return update(state, { updatingAsync: { $set: true } });

    case actionTypes.COUNTERS_ASYNC_COMMIT_INCREMENT:
      return update(state, {
        asyncCounter: val => val + action.howMuch,
        updatingAsync: { $set: false },
      });

    default:
      return state;
  }
};
