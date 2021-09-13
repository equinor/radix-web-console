import actionTypes from './action-types';
import update from 'immutability-helper';
import { isEqual } from 'lodash';
const localStorageKey = 'lastKnownApplications';

const initialState = JSON.parse(localStorage.getItem(localStorageKey)) || [];

export const lastKnownApplications = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPS_LASTKNOWN_SET:
      if (!isEqual(state, action.payload)) {
        localStorage.setItem(localStorageKey, JSON.stringify(action.payload));
        return update(state, { $set: action.payload });
      }
      return state;
    default:
      return state;
  }
};
