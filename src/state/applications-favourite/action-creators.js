import actionTypes from './action-types';

export const toggleFavouriteApplication = (appName) => ({
  type: actionTypes.APPS_FAVOURITE_TOGGLE,
  payload: appName,
});
