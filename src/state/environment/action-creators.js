import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export const actions = {
  /**
   * Action creator for requesting an environment deletion
   * @param {Object} env The environment object
   */
  deleteEnvRequest: makeActionCreator(
    actionTypes.ENVIRONMENT_DELETE_REQUEST,
    'env'
  ),

  /**
   * Action creator for marking an environment deletion as complete
   * @param {Object} env The environment object
   */
  deleteEnvConfirm: makeActionCreator(
    actionTypes.ENVIRONMENT_DELETE_COMPLETE,
    'env'
  ),

  /**
   * Action creator for an marking an environment deletion as failed
   * @param {string} error Error message
   */
  deleteEnvFail: makeActionCreator(
    actionTypes.ENVIRONMENT_DELETE_FAIL,
    'error'
  ),
};

export default actions;
