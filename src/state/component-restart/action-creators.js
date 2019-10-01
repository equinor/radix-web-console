import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export default {
  /**
   * Action creator for requesting an component restart
   * @param {string} appName The name of the app
   * @param {string} envName The name of the environment
   * @param {string} componentName The name of the component
   */
  restartComponent: makeActionCreator(
    actionTypes.RESTART_COMPONENT_REQUEST,
    'component'
  ),

  /**
   * Action creator for marking an component restart as complete
   */
  restartComponentConfirm: makeActionCreator(
    actionTypes.RESTART_COMPONENT_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for marking an component restart as failed
   * @param {string} error The error message
   */
  restartComponentFail: makeActionCreator(
    actionTypes.RESTART_COMPONENT_FAIL,
    'error'
  ),
};
