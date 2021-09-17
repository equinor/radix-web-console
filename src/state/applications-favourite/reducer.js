import update from 'immutability-helper';
import actionTypes from './action-types';

const localStorageKey = 'favouriteApplications';

const initialState = JSON.parse(localStorage.getItem(localStorageKey)) || [];

const storeFavouriteApps = (appNames) =>
  localStorage.setItem(localStorageKey, JSON.stringify(appNames));

export const favouriteApplications = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPS_FAVOURITE_TOGGLE:
      const idx = state.findIndex((appName) => appName === action.appName);
      const newState =
        idx >= 0
          ? update(state, { $splice: [[idx, 1]] })
          : update(state, { $push: [action.appName] });
      storeFavouriteApps(newState);
      return newState;
    default:
      return state;
  }
};
