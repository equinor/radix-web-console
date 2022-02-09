import { getComponent } from '../environment';
import { restartState } from '../restart-utils';

/**
 * Get component status for given component
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @returns {string} Component status, or 'Unknown' if component was not found
 */
export const getComponentStatus = (state, componentName) => {
  const component = getComponent(state, componentName);

  if (component && component.status) {
    return component.status;
  }

  return 'Unknown';
};

/**
 * Get component start status for given component
 * @param {Object} state The Redux store state
 * @returns {string} Component status, or 'Unknown' if component was not found
 */
export const getStartRequestStatus = (state) => {
  return state.component.componentStartRequest.status;
};

/**
 * Get component start error for given component
 * @param {Object} state The Redux store state
 * @returns {string} Component status, or 'Unknown' if component was not found
 */
export const getStartRequestError = (state) => {
  return state.component.componentStartRequest.lastError;
};

/**
 * Get component stop status for given component
 * @param {Object} state The Redux store state
 * @returns {string} Component status, or 'Unknown' if component was not found
 */
export const getStopRequestStatus = (state) => {
  return state.component.componentStopRequest.status;
};

/**
 * Get component stop error for given component
 * @param {Object} state The Redux store state
 * @returns {string} Component status, or 'Unknown' if component was not found
 */
export const getStopRequestError = (state) => {
  return state.component.componentStopRequest.lastError;
};

export const componentRestartState = restartState('component');
