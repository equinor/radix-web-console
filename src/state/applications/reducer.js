import update from 'immutability-helper';

import actionTypes from './action-types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPS_LIST_ADD:
      return update(state, { [action.app.metadata.uid]: { $set: action.app } });

    default:
      return state;
  }
};
