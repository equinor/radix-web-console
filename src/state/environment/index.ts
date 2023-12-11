import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { actionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import type { ApiResourceKey } from '../../api/resources';
import type { RootState } from '../../init/store';
import type { RawModel } from '../../models/model-types';
import { ConfigurationStatus } from '../../models/radix-api/environments/configuration-status';
import type { EnvironmentModel } from '../../models/radix-api/environments/environment';
import { EnvironmentModelNormalizer } from '../../models/radix-api/environments/environment/normalizer';
import type { SecretModel } from '../../models/radix-api/secrets/secret';

const initialState: EnvironmentModel = {
  name: '',
  status: ConfigurationStatus.Pending,
};

const snapshotAction = createAction<
  EnvironmentModel | RawModel<EnvironmentModel>
>(actionTypes.ENVIRONMENT_SNAPSHOT);
const subscriptionEndedAction = createAction<void>(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const envSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, { payload }) =>
        EnvironmentModelNormalizer(payload)
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'ENVIRONMENT'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

/**
 * Get the current environment
 * @param {Object} state Redux state
 */
export const getMemoizedEnvironment = createSelector(
  (state: RootState) => state.environment,
  (environment) => environment
);

export function getComponentSecret(
  env: EnvironmentModel,
  secretName: string,
  componentName: string
): SecretModel {
  return (
    env?.activeDeployment &&
    env.secrets?.find(
      ({ name, component }) =>
        name === secretName && component === componentName
    )
  );
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

export default envSlice.reducer;
