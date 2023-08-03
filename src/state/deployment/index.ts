import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { DeploymentActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import { ApiResourceKey } from '../../api/resources';
import type { RootState } from '../../init/store';
import type { RawModel } from '../../models/model-types';
import type { DeploymentModel } from '../../models/radix-api/deployments/deployment';
import { DeploymentModelNormalizer } from '../../models/radix-api/deployments/deployment/normalizer';

const initialState: DeploymentModel = {
  name: '',
  namespace: '',
  environment: '',
  createdByJob: '',
};

const snapshotAction = createAction<
  DeploymentModel | RawModel<DeploymentModel>
>(DeploymentActionTypes.DEPLOYMENT_SNAPSHOT);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const deploymentSlice = createSlice({
  name: 'deployment',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, { payload }) =>
        DeploymentModelNormalizer(payload)
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'DEPLOYMENT'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedDeployment = createSelector(
  (state: RootState) => state.deployment,
  (deployment) => deployment
);

export const reducer = deploymentSlice.reducer;
export default reducer;
