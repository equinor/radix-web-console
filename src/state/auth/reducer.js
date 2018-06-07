import update from 'immutability-helper';

import actionTypes from './action-types';
import { statusTypes } from './status-types';

const initialState = {
  user: null,
  status: statusTypes.NOT_AUTHENTICATED,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_REQUEST:
    case actionTypes.AUTH_LOGIN_SUCCESS:
    case actionTypes.AUTH_LOGIN_RESET:
    case actionTypes.AUTH_LOGOUT:

    default:
      return state;
  }
};
