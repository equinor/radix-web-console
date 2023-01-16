import { actionTypes } from './action-types';

import { makeActionCreator } from '../state-utils/action-creators';

export const actions = {
  /**
   * Action creator for requesting an environment deletion
   * @param {Object} env The environment object
   */
  deleteEnvRequest: makeActionCreator<
    never,
    { env: { appName: string; envName: string } },
    [env: { appName: string; envName: string }]
  >(actionTypes.ENVIRONMENT_DELETE_REQUEST, 'env'),

  /**
   * Action creator for marking an environment deletion as complete
   * @param {Object} payload The environment object
   */
  deleteEnvConfirm: makeActionCreator<
    { appName: string; envName: string },
    never,
    [payload: { appName: string; envName: string }]
  >(actionTypes.ENVIRONMENT_DELETE_COMPLETE, 'payload'),

  /**
   * Action creator for an marking an environment deletion as failed
   * @param {string} error Error message
   */
  deleteEnvFail: makeActionCreator<never, never, [error: string]>(
    actionTypes.ENVIRONMENT_DELETE_FAIL,
    'error'
  ),
};
