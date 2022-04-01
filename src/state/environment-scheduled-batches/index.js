import get from 'lodash/get';

/**
 * Get the current environment ScheduledBatchesSummaryModel
 * @param {Object} state The Redux store state
 */
export const getEnvironmentScheduledBatches = (state) =>
  get(state, 'environmentScheduledBatches');
