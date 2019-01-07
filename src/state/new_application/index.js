import get from 'lodash/get';
import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('application');

export const getApplication = state => get(state, 'application');
export const getJobs = state => localGetter(state, 'jobs', []);
export const getEnvironmentSummaries = state =>
  localGetter(state, 'environments', []);
export const getEnvironmentNames = state =>
  getEnvironmentSummaries(state).map(env => env.name);
