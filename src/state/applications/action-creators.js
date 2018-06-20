import actionTypes from './action-types';

export const addAppToList = app => ({
  type: actionTypes.APPS_LIST_ADD,
  app,
});
