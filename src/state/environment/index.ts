import {
  combineReducers,
  createAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { actionTypes } from './action-types';

import { restartState } from '../restart-base';
import { restartReducer } from '../restart-base/reducer';
import { startState } from '../start-base';
import { startReducer } from '../start-base/reducer';
import { ActionType } from '../state-utils/action-creators';
import { stopState } from '../stop-base';
import { stopReducer } from '../stop-base/reducer';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import { ApiResourceKey } from '../../api/resources';
import { RootState } from '../../init/store';
import { ComponentModel } from '../../models/component';
import { ConfigurationStatus } from '../../models/configuration-status';
import { EnvironmentModel } from '../../models/environment';
import { EnvironmentModelNormalizer } from '../../models/environment/normalizer';
import { ReplicaStatus } from '../../models/replica-status';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { SecretModel } from '../../models/secret';

const initialState: {
  environment: EnvironmentModel;
  isDeleted?: boolean;
  error?: string;
} = {
  environment: { name: '', status: ConfigurationStatus.Pending },
  error: null,
};

const snapshotAction = createAction<EnvironmentModel | unknown>(
  actionTypes.ENVIRONMENT_SNAPSHOT
);
const deleteFailAction = createAction(actionTypes.ENVIRONMENT_DELETE_FAIL);
const deleteCompleteAction = createAction(
  actionTypes.ENVIRONMENT_DELETE_COMPLETE
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const envSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, action) => ({
        environment: EnvironmentModelNormalizer(action.payload),
        error: null,
      }))
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'ENVIRONMENT'
          ? initialState
          : state
      )
      .addCase(deleteFailAction, (state, action) => ({
        ...state,
        ...{ isDeleted: false, error: (action as ActionType).error },
      }))
      .addCase(deleteCompleteAction, (state) => ({
        ...state,
        ...{ isDeleted: true, error: null },
      }))
      .addDefaultCase((state) => state),
});

export const environmentRestartState = restartState('environment');
export const environmentStartState = startState('environment');
export const environmentStopState = stopState('environment');

/**
 * Get the current environment
 * @param {Object} state The Redux store state
 */
export const getMemoizedEnvironment = createSelector(
  (state: RootState) => state.environment.instance.environment,
  (environment) => environment
);

export const getMemoizedEnvironmentMeta = createSelector(
  (state: RootState) => state.environment.instance,
  (environment) => ({
    isDeleted: environment.isDeleted,
    error: environment.error,
  })
);

/**
 * Get branch name in the current environment
 * @param {Object} state The Redux store state
 * @returns {?String} Branch name value if any
 */
export function getBranchName(state: RootState): string {
  return { ...getMemoizedEnvironment(state) }.branchMapping;
}

/**
 * Get a list of components from the active deployment in the current environment
 * @param {Object} state The Redux store state
 * @returns {?Array} Array of Components, or null if no active deployment
 */
export function getComponents(state: RootState): Array<ComponentModel> {
  const env = { ...getMemoizedEnvironment(state) };
  return env.activeDeployment ? env.activeDeployment.components || [] : null;
}

/**
 * Get a component from the active deployment in the current environment
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @returns {?ComponentModel} ComponentModel, or null if no active deployment or no Component with the name provided
 */
export function getComponent(
  state: RootState,
  componentName: string
): ComponentModel {
  return getComponents(state)?.find(({ name }) => name === componentName);
}

/**
 * Get a replica from the active deployment in the current environment
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @param {string} replicaName The name of the replica
 * @returns {?ReplicaSummaryNormalizedModel} ReplicaSummaryNormalizedModel, or null if component or replica was not found
 */
export function getReplica(
  state: RootState,
  componentName: string,
  replicaName: string
): ReplicaSummaryNormalizedModel {
  return getComponent(state, componentName)?.replicaList?.find(
    ({ name }) => name === replicaName
  );
}

/**
 * Get replica status for given replica
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @param {string} replicaName The name of the replica
 * @returns {string} ReplicaStatus status, or null if component or replica was not found
 */
export function getReplicaStatus(
  state: RootState,
  componentName: string,
  replicaName: string
): ReplicaStatus {
  return getReplica(state, componentName, replicaName)?.status;
}

/**
 * Get replica status message for given replica
 * @param {Object} state The Redux store state
 * @param {string} componentName The name of the component
 * @param {string} replicaName The name of the replica
 * @returns {?string} Replica status, or null if component or replica was not found
 */
export function getReplicaStatusMessage(
  state: RootState,
  componentName: string,
  replicaName: string
): string {
  return getReplica(state, componentName, replicaName)?.statusMessage;
}

/**
 * Retrive the name of the currently-active deployment in the current enviornment
 * @param {Object} state The Redux store state
 */
export function getActiveDeploymentName(state: RootState): string {
  return { ...getMemoizedEnvironment(state) }.activeDeployment?.name;
}

export function getComponentSecret(
  env: EnvironmentModel,
  secretName: string,
  componentName: string
): SecretModel {
  return env?.activeDeployment
    ? env.secrets?.find(
        ({ name, component }) =>
          name === secretName && component === componentName
      )
    : null;
}

export function getSecret(
  state: RootState,
  componentName: string,
  secretName: string
): SecretModel {
  return getComponentSecret(
    { ...getMemoizedEnvironment(state) },
    secretName,
    componentName
  );
}

export default combineReducers({
  instance: envSlice.reducer,
  restartRequest: restartReducer('ENVIRONMENT'),
  startRequest: startReducer('ENVIRONMENT'),
  stopRequest: stopReducer('ENVIRONMENT'),
});
