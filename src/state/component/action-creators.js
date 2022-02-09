import { restartActions } from '../restart-utils/action-creators';
import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export const actions = {
  /**
   * Action creator for requesting an component start
   * @param {Object} component The component object
   */
  startComponentRequest: makeActionCreator(
    actionTypes.COMPONENT_START_REQUEST,
    'component'
  ),

  /**
   * Action creator for marking an component start as complete
   */
  startComponentConfirm: makeActionCreator(
    actionTypes.COMPONENT_START_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for marking an component start as failed
   * @param {string} error The error message
   */
  startComponentFail: makeActionCreator(
    actionTypes.COMPONENT_START_FAIL,
    'error'
  ),

  /**
   * Action creator for requesting an component stop
   * @param {Object} component The component object
   */
  stopComponentRequest: makeActionCreator(
    actionTypes.COMPONENT_STOP_REQUEST,
    'component'
  ),

  /**
   * Action creator for marking an component stop as complete
   */
  stoppedComponentConfirm: makeActionCreator(
    actionTypes.COMPONENT_STOP_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for marking an component start as failed
   * @param {string} error The error message
   */
  stoppedComponentFail: makeActionCreator(
    actionTypes.COMPONENT_STOP_FAIL,
    'error'
  ),

  ...restartActions('COMPONENT', 'appName', 'envName', 'componentName'),
};

export default actions;
