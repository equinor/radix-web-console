import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export const actions = {
  /**
   * Action creator for requesting an application deletion
   * @param {string} id ID of the application to delete
   */
  deleteAppRequest: makeActionCreator(actionTypes.APP_DELETE_REQUEST, 'id'),

  /**
   * Action creator for marking an application deletion as complete
   * @param {string} id ID of the deleted application
   */
  deleteAppConfirm: makeActionCreator(actionTypes.APP_DELETE_COMPLETE, 'id'),

  /**
   * Action creator for an marking an application deletion as failed
   * @param {string} id ID of the application
   * @param {string} error Error message
   */
  deleteAppFail: makeActionCreator(actionTypes.APP_DELETE_FAIL, 'id', 'error'),

  /**
   * Action creator for resetting an application deletion status
   * @param {string} id ID of the application
   */
  deleteAppReset: makeActionCreator(actionTypes.APP_DELETE_RESET, 'id'),

  /**
   * Action creator for requesting an application modification
   * @param {string} id ID of the application to delete
   * @param {object} registration The updated app registration object
   */
  modifyAppRequest: makeActionCreator(
    actionTypes.APP_MODIFY_REQUEST,
    'id',
    'registration'
  ),

  /**
   * Action creator for marking an application modification as complete
   * @param {string} id ID of the deleted application
   */
  modifyAppConfirm: makeActionCreator(actionTypes.APP_MODIFY_COMPLETE, 'id'),

  /**
   * Action creator for an marking an application modification as failed
   * @param {string} id ID of the application
   * @param {string} error Error message
   */
  modifyAppFail: makeActionCreator(actionTypes.APP_MODIFY_FAIL, 'id', 'error'),

  /**
   * Action creator for resetting an application modification status
   * @param {string} id ID of the application
   */
  modifyAppReset: makeActionCreator(actionTypes.APP_MODIFY_RESET, 'id'),

  /**
   * Action creator to initiate change of application's admin groups
   * @param {string} id ID of the application
   * @param {Object} adGroupConfig IDs of the new admin groups (can be an empty array)
   * @param {string} adGroupConfig.adGroups Comma-separated list of GUIDs
   * @param {bool} adGroupConfig.adModeAuto If true, let Radix define access; ignore adGroups
   */
  changeAppAdmin: makeActionCreator(
    actionTypes.APP_CHANGE_ADMIN,
    'id',
    'adGroupConfig'
  ),

  /**
   * Action creator to initiate change of application's admin groups
   * @param {string} id ID of the application
   * @param {Object} repositoryConfig Patch request
   * @param {Object} repositoryConfig.appRegistrationPatchRequest Patch
   * @param {Object} repositoryConfig.appRegistrationPatchRequest.applicationRegistrationPatch Patch object
   * @param {String} repositoryConfig.appRegistrationPatchRequest.applicationRegistrationPatch.repository Repository to patch
   * @param {bool} repositoryConfig.appRegistrationPatchRequest.acknowledgeWarnings If true, let Radix ignore warnings
   */
  changeRepository: makeActionCreator(
    actionTypes.APP_CHANGE_REPOSITORY,
    'id',
    'repositoryConfig'
  ),
};

export default actions;
