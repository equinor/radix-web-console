import actionTypes from './action-types';
import update from 'immutability-helper';
import { isEqual } from 'lodash';

const localStorageKey = 'lastKnownApplications';
const initialState = JSON.parse(localStorage.getItem(localStorageKey)) || [];
const storeLastKnownApps = (appNames) =>
  localStorage.setItem(localStorageKey, JSON.stringify(appNames));

export const lastKnownApplications = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPS_LASTKNOWN_SET:
      if (!isEqual(state, action.appNames)) {
        storeLastKnownApps(action.appNames);
        return update(state, { $set: action.appNames });
      }
      return state;
    case actionTypes.APPS_LASTKNOWN_ADD:
      const idx = state.findIndex((appName) => appName === action.appName);
      const newState =
        idx === -1 ? update(state, { $push: [action.appName] }) : state;
      storeLastKnownApps(newState);
      return newState;
    default:
      return state;
  }
};
