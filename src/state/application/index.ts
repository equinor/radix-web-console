import {
  combineReducers,
  createAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { actionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import { makeRequestReducer } from '../state-utils/request';
import { RequestState } from '../state-utils/request-states';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import type { ApiResourceKey } from '../../api/resources';
import type { RootState } from '../../init/store';
import type { RawModel } from '../../models/model-types';
import type { ApplicationModel } from '../../models/radix-api/applications/application';
import { ApplicationModelNormalizer } from '../../models/radix-api/applications/application/normalizer';

const initialState: {
  app: ApplicationModel;
  isDeleted?: boolean;
  error?: string;
} = {
  app: {
    name: '',
    registration: {
      name: '',
      repository: '',
      sharedSecret: '',
      owner: '',
      creator: '',
      wbs: '',
      configBranch: '',
    },
    userIsAdmin: false,
  },
  error: null,
};

const snapshotAction = createAction<
  ApplicationModel | RawModel<ApplicationModel>
>(actionTypes.APP_SNAPSHOT);
const deleteFailAction = createAction<void>(actionTypes.APP_DELETE_FAIL);
const deleteCompleteAction = createAction<void>(
  actionTypes.APP_DELETE_COMPLETE
);
const subscriptionEndedAction = createAction<void>(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, { payload }) => ({
        app: ApplicationModelNormalizer(payload),
        error: null,
      }))
      .addCase(deleteFailAction, (state, { error }: ActionType) => ({
        ...state,
        isDeleted: false,
        error: error,
      }))
      .addCase(deleteCompleteAction, (state) => ({
        ...state,
        isDeleted: true,
        error: null,
      }))
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'APP'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

const getMemoizedAppModify = createSelector(
  (state: RootState) => state.application.modifyRequest,
  (modifyRequest) => modifyRequest
);

export const getMemoizedApplicationMeta = createSelector(
  (state: RootState) => state.application.instance,
  ({ isDeleted, error }) => ({ isDeleted, error })
);

export const getMemoizedApplication = createSelector(
  (state: RootState) => state.application.instance.app,
  (app) => app
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

export function getModifyRequestState(state: RootState): RequestState {
  return { ...getMemoizedAppModify(state) }.status;
}

export function getModifyRequestError(state: RootState): string {
  return { ...getMemoizedAppModify(state) }.lastError;
}

export const reducer = combineReducers({
  instance: appSlice.reducer,
  deleteRequest: makeRequestReducer<string>('APP_DELETE'),
  modifyRequest: makeRequestReducer<string>('APP_MODIFY'),
});
export default reducer;
