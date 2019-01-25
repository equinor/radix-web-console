import get from 'lodash/get';
import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('application');
const instanceGetter = makeLocalGetter('application.instance');

export const getApplication = state => localGetter(state, 'instance');
export const getApplicationState = state => get(state, 'application');
export const getJobs = state => instanceGetter(state, 'jobs', []);
export const getEnvironmentSummaries = state =>
  instanceGetter(state, 'environments', []);
export const getEnvironmentBranches = state =>
  getEnvironmentSummaries(state)
    .filter(env => env.branchMapping && env.branchMapping.length)
    .map(env => env.branchMapping);
export const getEnvironmentNames = state =>
  getEnvironmentSummaries(state).map(env => env.name);
