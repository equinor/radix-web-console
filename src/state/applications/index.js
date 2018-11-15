import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('applications_old');

export const getCreationState = state => localGetter(state, 'creation.status');
export const getCreationResult = state =>
  localGetter(state, 'creation.payload');
export const getCreationError = state =>
  localGetter(state, 'creation.lastError');

export const getApplications = state => localGetter(state, 'apps');
export const getApplicationList = state =>
  Object.values(getApplications(state));

export const getApplication = (state, appName) =>
  localGetter(state, 'apps')[appName];

export const getAppEnvs = (state, appName) => {
  const envs = getApplication(state, appName).spec.environments;
  return envs || [];
};

export const getAppComponents = (state, appName) => {
  const components = getApplication(state, appName).spec.components;
  return components || [];
};

export const getAppJobs = (state, appName) => {
  const jobs = getApplication(state, appName).jobs;
  return Object.values(jobs)
    .sort(
      (b1, b2) =>
        b1.metadata.creationTimestamp > b2.metadata.creationTimestamp ? 1 : -1
    )
    .reverse();
};

export const getAppJob = (state, appName, jobName) =>
  getApplication(state, appName).jobs[jobName];
