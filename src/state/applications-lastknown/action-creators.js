import actionTypes from './action-types';

export const setLastKnownApplicationNames = (payload) => ({
  type: actionTypes.APPS_LASTKNOWN_SET,
  payload,
});
