import get from 'lodash/get';
import { makeLocalGetter } from '../../utils/object';

export const getApplicationState = (state) => get(state, 'application');
export const getApplication = (state) => get(state, 'application.instance');

const appInstanceGetter = makeLocalGetter('application.instance');

export const getAppAlias = (state) => appInstanceGetter(state, 'appAlias');

export const getJobs = (state) => appInstanceGetter(state, 'jobs', []);

/**
 * Getter for the application registration data (i.e. the RR)
 */
export const getRegistration = (state) =>
  appInstanceGetter(state, 'registration');

export const getEnvironmentSummaries = (state) =>
  appInstanceGetter(state, 'environments', []);

export const getEnvironmentBranches = (state) => {
  const branches = {};
  const allJobs = getJobs(state);
  const allEnvs = getEnvironmentSummaries(state);
  const envs = allEnvs.filter(
    (env) => env.branchMapping && env.branchMapping.length
  );

  envs.forEach((env) => {
    if (!branches[env.branchMapping]) {
      branches[env.branchMapping] = [env.name];
    } else {
      branches[env.branchMapping].push(env.name);
    }
  });

  if (
    Object.keys(branches).length === 0 &&
    allEnvs.length === 0 &&
    allJobs.length === 0
  ) {
    const registration = getRegistration(state);
    const configBranch = getConfigBranchFromRegistration(registration);
    branches[configBranch] = '';
  }

  return branches;
};

const getConfigBranchFromRegistration = (registration) => {
  if (!registration || !registration.configBranch) {
    return 'master';
  }

  return registration.configBranch;
};

export const getEnvironmentNames = (state) =>
  getEnvironmentSummaries(state).map((env) => env.name);

export const getDeleteRequestStatus = (state) =>
  getApplicationState(state).deleteRequest.status;

export const getModifyRequestState = (state) =>
  getApplicationState(state).modifyRequest.status;

export const getModifyRequestError = (state) =>
  getApplicationState(state).modifyRequest.lastError;

export const getModifyRequestResult = (state) => {
  let applicationState = getApplicationState(state);
  return applicationState.modifyRequest.payload;
};
