import update from 'immutability-helper';
import get from 'lodash/get';

import actionTypes from './action-types';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.PODS_START_STREAMING:
      return [];

    case actionTypes.PODS_STOP_STREAMING:
      return [];

    case actionTypes.PODS_LIST_ADD:
      return [];

    case actionTypes.PODS_LIST_REMOVE:
      return [];

    default:
      return state;
  }
};
