import get from 'lodash/get';
import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('application');

export const getApplication = state => get(state, 'application');
export const getJobs = state => localGetter(state, 'jobs');
export const getEnvironmentNames = state =>
  localGetter(state, 'environments', []).map(env => env.name);
