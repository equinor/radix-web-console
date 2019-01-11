import get from 'lodash/get';
import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('application');
const instanceGetter = makeLocalGetter('application.instance');

export const getApplication = state => localGetter(state, 'instance');
export const getApplicationState = state => get(state, 'application');
export const getJobs = state => instanceGetter(state, 'jobs', []);
export const getEnvironmentSummaries = state =>
  instanceGetter(state, 'environments', []);
export const getEnvironmentNames = state =>
  getEnvironmentSummaries(state).map(env => env.name);
