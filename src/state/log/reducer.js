import update from 'immutability-helper';

import actionTypes from './action-types';

const initialState = {
  log: "",
  updatingLog: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_LOG_REQUEST:
      return update(state, { updatingLog: { $set: true } });

    case actionTypes.UPDATE_LOG_COMMIT:
      return update(state, {
        log: { $set: action.log ? action.log : "Found no log" },
        updatingLog: { $set: false },
      });

    default:
      return state;
  }
};
