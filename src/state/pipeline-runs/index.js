import get from 'lodash/get';

export const getPipelineRuns = (state) => get(state, 'pipelineRuns', []);
