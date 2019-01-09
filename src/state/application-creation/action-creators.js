import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export default {
  /**
   * Action creator for requesting an app creation
   * @param {Object} app The application object
   */
  addAppRequest: makeActionCreator(actionTypes.APPS_ADD_REQUEST, 'app'),

  /**
   * Action creator for marking an app creation as complete
   */
  addAppConfirm: makeActionCreator(actionTypes.APPS_ADD_COMPLETE, 'payload'),

  /**
   * Action creator for marking an app creation as failed
   * @param {string} error The error message
   */
  addAppFail: makeActionCreator(actionTypes.APPS_ADD_FAIL, 'error'),

  /**
   * Action creator for resetting app creation status
   */
  addAppReset: makeActionCreator(actionTypes.APPS_ADD_RESET),
};
