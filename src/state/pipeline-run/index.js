import get from 'lodash/get';

export const getPipelineRun = (state) => get(state, 'pipelineRun', null);
