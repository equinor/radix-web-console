import actionTypes from './action-types';

export const addAppToList = app => ({
  type: actionTypes.APPS_LIST_ADD,
  app,
});

export const deleteAppFromList = app => ({
  type: actionTypes.APPS_LIST_REMOVE,
  app,
});

export const requestCreateApp = request => ({
  type: actionTypes.APPS_ADD_REQUEST,
  request,
});

export const confirmCreateApp = () => ({
  type: actionTypes.APPS_ADD_CONFIRM,
});

export const failCreateApp = () => ({
  type: actionTypes.APPS_ADD_FAIL,
});
