import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export const actions = {
  /**
   * Action creator for requesting enabling alerts for an environment
   * @param {string} appName The application name
   * @param {string} envName The environment name
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
   * Action creator for resetting request state for enabling alerting requests
   * @param {string} appName The application name
   * @param {string} envName The environment name
   */
  enableEnvironmentAlertingReset: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_ENABLE_RESET,
    'appName',
    'envName'
  ),

  /**
   * Action creator for requesting disabling alerts for an environment
   * @param {string} appName The application name
   * @param {string} envName The environment name
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

  /**
   * Action creator for resetting request state for disabling alerting requests
   * @param {string} appName The application name
   * @param {string} envName The environment name
   */
  disableEnvironmentAlertingReset: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_DISABLE_RESET,
    'appName',
    'envName'
  ),

  /**
   * Action creator for requesting update alerts for an environment
   * @param {string} appName The application name
   * @param {string} envName The environment name
   */
  updateEnvironmentAlertingRequest: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_UPDATE_REQUEST,
    'appName',
    'envName',
    'request'
  ),

  /**
   * Action creator for marking update alerts for an environment as complete
   * @param {Object} env The environment object
   */
  updateEnvironmentAlertingConfirm: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_UPDATE_COMPLETE,
    'payload'
  ),

  /**
   * Action creator for an marking update alerts for an environment as failed
   * @param {string} error Error message
   */
  updateEnvironmentAlertingFail: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_UPDATE_FAIL,
    'error'
  ),

  /**
   * Action creator for resetting request state for update alerting requests
   * @param {string} appName The application name
   * @param {string} envName The environment name
   */
  updateEnvironmentAlertingReset: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_UPDATE_RESET,
    'appName',
    'envName'
  ),

  /**
   * Action creator for resetting request state for disabling alerting requests
   * @param {string} appName The application name
   * @param {string} envName The environment name
   */
  setAlertingSnapshot: makeActionCreator(
    actionTypes.ENVIRONMENT_ALERTING_SNAPSHOT,
    'payload'
  ),
};

export default actions;
