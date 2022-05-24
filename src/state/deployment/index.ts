import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DeploymentActionTypes } from './action-types';

import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import type { RootState } from '../../init/store';
import type { DeploymentModel } from '../../models/deployment';
import { DeploymentModelNormalizer } from '../../models/deployment/normalizer';

const initialState: DeploymentModel = null;

const deploymentSlice = createSlice({
  name: 'deployment',
  initialState,
  reducers: {},
  extraReducers: {
    [DeploymentActionTypes.DEPLOYMENT_SNAPSHOT](
      _,
      action: PayloadAction<DeploymentModel | unknown>
    ) {
      return DeploymentModelNormalizer(action.payload);
    },
    [SubscriptionsActionTypes.SUBSCRIPTION_ENDED](
      state,
      action: PayloadAction<unknown> & { resourceName: string }
    ) {
      return action.resourceName === 'DEPLOYMENT' ? initialState : state;
    },
  },
});

export const getMemoizedDeployment = createSelector(
  (state: RootState) => state.deployment,
  (deployment) => deployment
);

export default deploymentSlice.reducer;
