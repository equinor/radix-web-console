import update from 'immutability-helper';

import actionTypes from './action-types';
import statusTypes from './status-types';

const initialState = {
  status: statusTypes.NOT_AUTHENTICATED,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_REQUEST:
      return update(state, { status: { $set: statusTypes.AUTHENTICATING } });

    case actionTypes.AUTH_LOGIN_SUCCESS:
      return update(state, {
        status: { $set: statusTypes.AUTHENTICATED },
        user: { $set: action.user },
      });

    case actionTypes.AUTH_LOGIN_FAIL:
      return update(state, {
        status: { $set: statusTypes.FAILED },
        user: { $set: null },
      });

    case actionTypes.AUTH_LOGOUT:
      return update(state, {
        status: { $set: statusTypes.NOT_AUTHENTICATED },
        user: { $set: null },
      });

    default:
      return state;
  }
};
