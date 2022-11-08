import { get } from 'lodash';

import AppState from './reducer';

import { RootState } from '../../init/store';
import { ApplicationModel } from '../../models/application';
import { makeLocalGetter } from '../../utils/object';
import { RequestState } from '../state-utils/request-states';

const appGetter = makeLocalGetter<RootState>('application');
const appInstanceGetter = makeLocalGetter<RootState>('application.instance');

export function getApplicationState(
  state: RootState
): ReturnType<typeof AppState> {
  return get<RootState, keyof RootState>(state, 'application');
}
export function getApplication(state: RootState): ApplicationModel {
  return appGetter(state, 'instance');
}

export function getAppAlias(state: RootState): ApplicationModel['appAlias'] {
  return appInstanceGetter(state, 'appAlias');
}

export function getJobs(state: RootState): ApplicationModel['jobs'] {
  return appInstanceGetter(state, 'jobs', []);
}

/**
 * Getter for the application registration data (i.e. the RR)
 */
export function getRegistration(
  state: RootState
): ApplicationModel['registration'] {
  return appInstanceGetter(state, 'registration');
}

export function getEnvironmentSummaries(
  state: RootState
): ApplicationModel['environments'] {
  return appInstanceGetter(state, 'environments', []);
}

export function getEnvironmentBranches(
  state: RootState
): Record<string, Array<string>> {
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
    const configBranch = getRegistration(state)?.configBranch;
    if (configBranch) {
      branches[configBranch] = [];
    }
  }

  return branches;
}

export function getEnvironmentNames(state: RootState): Array<string> {
  return getEnvironmentSummaries(state).map(({ name }) => name);
}

export function getDeleteRequestStatus(state: RootState): RequestState {
  return getApplicationState(state).deleteRequest.status;
}

export function getModifyRequestState(state: RootState): RequestState {
  return getApplicationState(state).modifyRequest.status;
}

export function getModifyRequestError(state: RootState): string {
  return getApplicationState(state).modifyRequest.lastError;
}

export function getModifyRequestResult(state: RootState): string {
  return getApplicationState(state).modifyRequest.payload;
}
