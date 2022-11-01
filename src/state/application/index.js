import { get } from 'lodash';

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
  const envs = getEnvironmentSummaries(state);

  // record of list of environment names mapped on branchMapping
  const branches = envs
    .filter(({ branchMapping }) => branchMapping?.length > 0)
    .reduce(
      (obj, { branchMapping, name }) => ({
        ...obj,
        [branchMapping]: [...(obj[branchMapping] ?? []), ...[name]],
      }),
      {}
    );

  if (Object.keys(branches).length === 0 && envs.length === 0) {
    const registration = getRegistration(state);
    const configBranch = getConfigBranchFromRegistration(registration);
    branches[configBranch] = [];
  }

  return branches;
};

const getConfigBranchFromRegistration = (registration) =>
  registration?.configBranch || 'master';

export const getEnvironmentNames = (state) =>
  getEnvironmentSummaries(state).map(({ name }) => name);

export const getDeleteRequestStatus = (state) =>
  getApplicationState(state).deleteRequest.status;

export const getModifyRequestState = (state) =>
  getApplicationState(state).modifyRequest.status;

export const getModifyRequestError = (state) =>
  getApplicationState(state).modifyRequest.lastError;

export const getModifyRequestResult = (state) => {
  const applicationState = getApplicationState(state);
  return applicationState.modifyRequest.payload;
};
