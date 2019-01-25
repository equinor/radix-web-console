export const getJob = state => state.job;
export const getStep = (state, stepName) =>
  state.job &&
  state.job.steps &&
  state.job.steps.find(step => step.name === stepName);
