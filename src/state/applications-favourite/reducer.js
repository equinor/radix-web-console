import actionTypes from './action-types';

const localStorageKey = 'favouriteApplications';

const initialState = JSON.parse(localStorage.getItem(localStorageKey)) || [];

export const favouriteApplications = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPS_FAVOURITE_SET:
      localStorage.setItem(localStorageKey, JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};
