import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export default {
  /**
   * Action creator for requesting an component restart
   * @param {Object} component The component object
   */
  restartComponentRequest: makeActionCreator(
    actionTypes.COMPONENT_RESTART_REQUEST,
    'component'
  ),

  /**
   * Action creator for marking an component restart as complete
   */
  restartComponentConfirm: makeActionCreator(
    actionTypes.COMPONENT_RESTART_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for marking an component restart as failed
   * @param {string} error The error message
   */
  restartComponentFail: makeActionCreator(
    actionTypes.COMPONENT_RESTART_FAIL,
    'error'
  ),
};
