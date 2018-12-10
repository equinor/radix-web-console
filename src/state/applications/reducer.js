import { combineReducers } from 'redux';

import { makeRequestReducer } from '../state-utils/request';
import actionTypes from './action-types';

const appsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.APPS_DELETE_REQUEST:
      return state; // todo: replace

    case actionTypes.APPS_DELETE_FAIL: // TODO
    case actionTypes.APPS_DELETE_COMPLETE:
      return state; // todo: replace

    default:
      return state;
  }
};

export default combineReducers({
  apps: appsReducer,
  creation: makeRequestReducer('APPS_ADD'),
});
