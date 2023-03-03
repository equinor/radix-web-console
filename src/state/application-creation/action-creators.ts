import { actionTypes } from './action-types';

import { makeActionCreator } from '../state-utils/action-creators';
import { createApp } from '../../api/apps';
import { ApplicationRegistrationUpsertResponseModel } from '../../models/application-registration-upsert-response';

export const actions = {
  /**
   * Action creator for requesting an app creation
   * @param {Object} app The application object
   */
  addAppRequest: makeActionCreator<
    never,
    { app: Parameters<typeof createApp>[0] },
    [app: Parameters<typeof createApp>[0]]
  >(actionTypes.APP_CREATION_REQUEST, 'app'),

  /**
   * Action creator for marking an app creation as complete
   */
  addAppConfirm: makeActionCreator<
    ApplicationRegistrationUpsertResponseModel,
    never,
    [payload: ApplicationRegistrationUpsertResponseModel]
  >(actionTypes.APP_CREATION_COMPLETE, 'payload'),

  /**
   * Action creator for marking an app creation as failed
   * @param {string} error The error message
   */
  addAppFail: makeActionCreator<never, never, [error: string]>(
    actionTypes.APP_CREATION_FAIL,
    'error'
  ),

  /**
   * Action creator for resetting app creation status
   */
  addAppReset: makeActionCreator<never, never, []>(
    actionTypes.APP_CREATION_RESET
  ),
};

export default actions;
