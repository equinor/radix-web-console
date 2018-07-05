import update from 'immutability-helper';
import get from 'lodash/get';

import actionTypes from './action-types';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.SECRETS_START_STREAMING:
      return [];

    case actionTypes.SECRETS_STOP_STREAMING:
      return [];

    case actionTypes.SECRETS_LIST_ADD:
      return [];

    case actionTypes.SECRETS_LIST_REMOVE:
      return [];

    default:
      return state;
  }
};
