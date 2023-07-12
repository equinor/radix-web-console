import {
  combineReducers,
  createAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { actionTypes } from './action-types';

import { ActionType } from '../state-utils/action-creators';
import { makeRequestReducer } from '../state-utils/request';
import { RequestState } from '../state-utils/request-states';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import { ApiResourceKey } from '../../api/resources';
import { RootState } from '../../init/store';
import { ApplicationModel } from '../../models/radix-api/applications/application';
import { ApplicationModelNormalizer } from '../../models/radix-api/applications/application/normalizer';

const initialState: ApplicationModel = {
  name: '',
  registration: {
    name: '',
    repository: '',
    sharedSecret: '',
    owner: '',
    creator: '',
    machineUser: false,
    wbs: '',
    configBranch: '',
  },
};

const snapshotAction = createAction<ApplicationModel | unknown>(
  actionTypes.APP_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, { payload }) =>
        ApplicationModelNormalizer(payload)
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'APP'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

const getMemoizedAppDelete = createSelector(
  (state: RootState) => state.application.deleteRequest,
  (deleteRequest) => deleteRequest
);

const getMemoizedAppModify = createSelector(
  (state: RootState) => state.application.modifyRequest,
  (modifyRequest) => modifyRequest
);

export const getMemoizedApplication = createSelector(
  (state: RootState) => state.application.instance,
  (instance) => instance
);

export function getAppAlias(state: RootState): ApplicationModel['appAlias'] {
  return { ...getMemoizedApplication(state) }.appAlias;
}

export function getJobs(state: RootState): ApplicationModel['jobs'] {
  return { ...getMemoizedApplication(state) }.jobs;
}

/**
 * Getter for the application registration data (i.e. the RR)
 */
export function getRegistration(
  state: RootState
): ApplicationModel['registration'] {
  return { ...getMemoizedApplication(state) }.registration;
}

export function getEnvironmentSummaries(
  state: RootState
): ApplicationModel['environments'] {
  return { ...getMemoizedApplication(state) }.environments;
}

export function getEnvironmentBranches(
  state: RootState
): Record<string, Array<string>> {
  const envs = getEnvironmentSummaries(state) || [];

  // record of environment names mapped on branchMapping
  const branches = envs
    .filter(({ branchMapping }) => !!branchMapping)
    .reduce<Record<string, Array<string>>>(
      (obj, { branchMapping, name }) => ({
        ...obj,
        [branchMapping]: [...(obj[branchMapping] || []), name],
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
  return { ...getMemoizedAppDelete(state) }.status;
}

export function getModifyRequestState(state: RootState): RequestState {
  return { ...getMemoizedAppModify(state) }.status;
}

export function getModifyRequestError(state: RootState): string {
  return { ...getMemoizedAppModify(state) }.lastError;
}

export function getModifyRequestResult(state: RootState): string {
  return { ...getMemoizedAppModify(state) }.payload;
}

export const reducer = combineReducers({
  instance: appSlice.reducer,
  deleteRequest: makeRequestReducer<string>('APP_DELETE'),
  modifyRequest: makeRequestReducer<string>('APP_MODIFY'),
});
export default reducer;
