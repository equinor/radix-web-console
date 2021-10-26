import { makeLocalGetter } from '../../utils/object';
import requestStates from '../state-utils/request-states';

const localGetter = makeLocalGetter('applicationAlerting');
const requestStatusGetter = (state, requestKey) =>
  localGetter(state, [requestKey, 'status'], requestStates.IDLE);
const requestErrorGetter = (state, requestKey) =>
  localGetter(state, [requestKey, 'lastError'], requestStates.IDLE);

/**
 * Get the current environment alerting state
 * @param {Object} state The Redux store state
 */
export const getApplicationAlerting = (state) => localGetter(state, 'instance');

/**
 * Get enable alerting request status
 * @param {Object} state The Redux store state
 */
export const getEnableAlertingRequestState = (state) =>
  requestStatusGetter(state, 'enableRequest');

/**
 * Get disable alerting request status
 * @param {Object} state The Redux store state
 */
export const getDisableAlertingRequestState = (state) =>
  requestStatusGetter(state, 'disableRequest');

/**
 * Get update alerting request status
 * @param {Object} state The Redux store state
 */
export const getUpdateAlertingRequestState = (state) =>
  requestStatusGetter(state, 'updateRequest');

/**
 * Get enable alerting request status
 * @param {Object} state The Redux store state
 */
export const getEnableAlertingRequestError = (state) =>
  requestErrorGetter(state, 'enableRequest');

/**
 * Get disable alerting request status
 * @param {Object} state The Redux store state
 */
export const getDisableAlertingRequestError = (state) =>
  requestErrorGetter(state, 'disableRequest');

/**
 * Get disable alerting request status
 * @param {Object} state The Redux store state
 */
export const getUpdateAlertingRequestError = (state) =>
  requestErrorGetter(state, 'updateRequest');
