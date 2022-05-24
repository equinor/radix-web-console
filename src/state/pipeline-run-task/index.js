import get from 'lodash/get';

export const getPipelineRunTask = (state) =>
  get(state, 'pipelineRunTask', null);
