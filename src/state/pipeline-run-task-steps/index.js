import get from 'lodash/get';

export const getPipelineRunTaskSteps = (state) =>
  get(state, 'pipelineRunTaskSteps', []);
