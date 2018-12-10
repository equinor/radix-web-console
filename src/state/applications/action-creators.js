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

  // ---------------------------------------------------------------------------

  /**
   * Action creator for requesting an application deletion
   * @param {string} id ID of the application to delete
   */
  deleteAppRequest: makeActionCreator(actionTypes.APPS_DELETE_REQUEST, 'id'),

  /**
   * Action creator for marking an application deletion as complete
   * @param {string} id ID of the deleted application
   */
  deleteAppConfirm: makeActionCreator(actionTypes.APPS_DELETE_COMPLETE, 'id'),

  /**
   * Action creator for an marking an application deletion as failed
   * @param {string} id ID of the application
   * @param {string} error Error message
   */
  deleteAppFail: makeActionCreator(actionTypes.APPS_DELETE_FAIL, 'id', 'error'),

  /**
   * Action creator for resetting an application deletion status
   * @param {string} id ID of the application
   */
  deleteAppReset: makeActionCreator(actionTypes.APPS_DELETE_RESET, 'id'),
};
