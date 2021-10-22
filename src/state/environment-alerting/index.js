import { makeLocalGetter } from '../../utils/object';
import requestStates from '../state-utils/request-states';

const localGetter = makeLocalGetter('environmentAlerting');
const requestStatusGetter = (state, requestKey) =>
  localGetter(state, [requestKey, 'status'], requestStates.IDLE);
const requestErrorGetter = (state, requestKey) =>
  localGetter(state, [requestKey, 'lastError'], requestStates.IDLE);

/**
 * Get the current environment alerting state
 * @param {Object} state The Redux store state
 */
export const getEnvironmentAlerting = (state) => localGetter(state, 'instance');

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
