import get from 'lodash/get';
import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('application');
const instanceGetter = makeLocalGetter('application.instance');

export const getApplication = state => localGetter(state, 'instance');
export const getApplicationState = state => get(state, 'application');
export const getJobs = state => instanceGetter(state, 'jobs');
export const getEnvironmentNames = state =>
  instanceGetter(state, 'environments', []).map(env => env.name);
