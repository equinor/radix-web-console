import get from 'lodash/get';

/**
 * Get the current environment ScheduledJobSummaryModel
 * @param {Object} state The Redux store state
 */
export const getEnvironmentScheduledJobs = (state) =>
  get(state, 'environmentScheduledJobs');
