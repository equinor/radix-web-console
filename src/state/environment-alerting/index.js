import get from 'lodash/get';

/**
 * Get the current environment alerting state
 * @param {Object} state The Redux store state
 */

export const getEnvironmentAlerting = (state) =>
  get(state, 'environmentAlerting.instance');
