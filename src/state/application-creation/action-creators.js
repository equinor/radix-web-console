import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export default {
  /**
   * Action creator for requesting an app creation
   * @param {Object} app The application object
   */
  addAppRequest: makeActionCreator(actionTypes.APP_CREATION_REQUEST, 'app'),

  /**
   * Action creator for marking an app creation as complete
   */
  addAppConfirm: makeActionCreator(
    actionTypes.APP_CREATION_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for marking an app creation as failed
   * @param {string} error The error message
   */
  addAppFail: makeActionCreator(actionTypes.APP_CREATION_FAIL, 'error'),

  /**
   * Action creator for resetting app creation status
   */
  addAppReset: makeActionCreator(actionTypes.APP_CREATION_RESET),
};
