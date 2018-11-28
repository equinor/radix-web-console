import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('jobLogs');

export const getJobLogs = state => localGetter(state);
export const getJobStepLog = (state, stepName) =>
  localGetter(state, [stepName, 'log']);
