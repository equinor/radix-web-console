import get from 'lodash/get';
import { makeLocalGetter } from '../../utils/object';

export const getApplicationState = state => get(state, 'application');
export const getApplication = state => get(state, 'application.instance');

const appInstanceGetter = makeLocalGetter('application.instance');

export const getAppAlias = state => appInstanceGetter(state, 'appAlias');
export const getJobs = state => appInstanceGetter(state, 'jobs', []);

export const getEnvironmentSummaries = state =>
  appInstanceGetter(state, 'environments', []);

export const getEnvironmentBranches = state => {
  const branches = {};
  const envs = getEnvironmentSummaries(state).filter(
    env => env.branchMapping && env.branchMapping.length
  );

  envs.forEach(env => {
    if (!branches[env.branchMapping]) {
      branches[env.branchMapping] = [env.name];
    } else {
      branches[env.branchMapping].push(env.name);
    }
  });

  return branches;
};

export const getEnvironmentNames = state =>
  getEnvironmentSummaries(state).map(env => env.name);
