import get from 'lodash/get';

export const getPipelineRunTasks = (state) =>
  get(state, 'pipelineRunTasks', []);
