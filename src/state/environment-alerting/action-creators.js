import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export const actions = {
  /**
   * Action creator for requesting enabling alerts for an environment
   * @param {Object} env The environment object
   */
  enableEnvironmentAlertingRequest: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_ENABLE_REQUEST,
    'appName',
    'envName'
  ),

  /**
   * Action creator for marking enabling alerts for an environment as complete
   * @param {Object} env The environment object
   */
  enableEnvironmentAlertingConfirm: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_ENABLE_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for an marking enabling alerts for an environment as failed
   * @param {string} error Error message
   */
  enableEnvironmentAlertingFail: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_ENABLE_FAIL,
    'error'
  ),

  /**
   * Action creator for requesting disabling alerts for an environment
   * @param {Object} env The environment object
   */
  disableEnvironmentAlertingRequest: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_DISABLE_REQUEST,
    'appName',
    'envName'
  ),

  /**
   * Action creator for marking disabling alerts for an environment as complete
   * @param {Object} env The environment object
   */
  disableEnvironmentAlertingConfirm: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_DISABLE_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for an marking disabling alerts for an environment as failed
   * @param {string} error Error message
   */
  disableEnvironmentAlertingFail: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_DISABLE_FAIL,
    'error'
  ),
};

export default actions;
