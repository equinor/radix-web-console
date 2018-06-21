import update from 'immutability-helper';

import actionTypes from './action-types';

const initialState = {
  apps: {},
  creating: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPS_LIST_ADD:
      return update(state, {
        apps: { [action.app.metadata.uid]: { $set: action.app } },
      });
    case actionTypes.APPS_ADD_REQUEST:
      return update(state, { creating: { $set: true } });
    case actionTypes.APPS_ADD_FAIL: // TODO
    case actionTypes.APPS_ADD_CONFIRM:
      return update(state, { creating: { $set: false } });

    default:
      return state;
  }
};
