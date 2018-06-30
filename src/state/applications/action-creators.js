import { makeActionCreator } from '../state-utils/action-creators';
import actionTypes from './action-types';

export default {
  addAppRequest: makeActionCreator(actionTypes.APPS_ADD_REQUEST, 'app'),
  addAppConfirm: makeActionCreator(actionTypes.APPS_ADD_CONFIRM),
  addAppFail: makeActionCreator(actionTypes.APPS_ADD_FAIL, 'error'),
  addAppReset: makeActionCreator(actionTypes.APPS_ADD_RESET),

  deleteAppRequest: makeActionCreator(actionTypes.APPS_DELETE_REQUEST, 'id'),
  deleteAppConfirm: makeActionCreator(actionTypes.APPS_DELETE_CONFIRM, 'id'),
  deleteAppFail: makeActionCreator(actionTypes.APPS_DELETE_FAIL, 'id', 'error'),
  deleteAppReset: makeActionCreator(actionTypes.APPS_DELETE_RESET, 'id'),

  addAppToList: app => ({ type: actionTypes.APPS_LIST_ADD, app }),

  deleteAppFromList: app => ({ type: actionTypes.APPS_LIST_REMOVE, app }),

  setAppBuildStatus: (appShortSha, buildStatus, timestamp) => ({
    type: actionTypes.APPS_SET_BUILD_STATUS,
    appShortSha,
    buildStatus,
    timestamp,
  }),
};
