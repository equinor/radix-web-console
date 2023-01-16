import { actionTypes } from './action-types';

import { makeActionCreator } from '../state-utils/action-creators';
import { AppModifyProps } from '../../api/apps';

export const actions = {
  /**
   * Action creator for requesting an application deletion
   * @param {string} id ID of the application to delete
   */
  deleteAppRequest: makeActionCreator<never, { id: string }, [id: string]>(
    actionTypes.APP_DELETE_REQUEST,
    'id'
  ),

  /**
   * Action creator for marking an application deletion as complete
   * @param {string} payload ID of the deleted application
   */
  deleteAppConfirm: makeActionCreator<string, never, [payload: string]>(
    actionTypes.APP_DELETE_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for an marking an application deletion as failed
   * @param {string} id ID of the application
   * @param {string} error Error message
   */
  deleteAppFail: makeActionCreator<
    never,
    { id: string },
    [id: string, error: string]
  >(actionTypes.APP_DELETE_FAIL, 'id', 'error'),

  /**
   * Action creator for resetting an application deletion status
   * @param {string} id ID of the application
   */
  deleteAppReset: makeActionCreator<never, { id: string }, [id: string]>(
    actionTypes.APP_DELETE_RESET,
    'id'
  ),

  /**
   * Action creator for requesting an application modification
   * @param {string} id ID of the application to delete
   * @param {object} registration The updated app registration object
   */
  modifyAppRequest: makeActionCreator<
    never,
    { id: string; registration: AppModifyProps },
    [id: string, registration: AppModifyProps]
  >(actionTypes.APP_MODIFY_REQUEST, 'id', 'registration'),

  /**
   * Action creator for marking an application modification as complete
   * @param {string} payload ID of the deleted application
   */
  modifyAppConfirm: makeActionCreator<string, never, [payload: string]>(
    actionTypes.APP_MODIFY_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for an marking an application modification as failed
   * @param {string} id ID of the application
   * @param {string} error Error message
   */
  modifyAppFail: makeActionCreator<
    never,
    { id: string },
    [id: string, error: string]
  >(actionTypes.APP_MODIFY_FAIL, 'id', 'error'),

  // redundant and pointless to send in the ID, as it will never be of use
  /**
   * Action creator for resetting an application modification status
   * @param {string} id ID of the application
   */
  modifyAppReset: makeActionCreator<never, { id: string }, [id: string]>(
    actionTypes.APP_MODIFY_RESET,
    'id'
  ),

  /**
   * Action creator to initiate change of application's admin groups
   * @param {string} id ID of the application
   * @param {Object} adGroupConfig The new admin group configuration
   */
  changeAppAdmin: makeActionCreator<
    never,
    { id: string; adGroupConfig: AppModifyProps },
    [id: string, adGroupConfig: AppModifyProps]
  >(actionTypes.APP_CHANGE_ADMIN, 'id', 'adGroupConfig'),
};
