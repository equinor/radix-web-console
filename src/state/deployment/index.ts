import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { DeploymentActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import { ApiResourceKey } from '../../api/resources';
import type { RootState } from '../../init/store';
import type { DeploymentModel } from '../../models/deployment';
import { DeploymentModelNormalizer } from '../../models/deployment/normalizer';

const initialState: DeploymentModel = {
  name: '',
  environment: '',
  createdByJob: '',
};

const snapshotAction = createAction<DeploymentModel | unknown>(
  DeploymentActionTypes.DEPLOYMENT_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const deploymentSlice = createSlice({
  name: 'deployment',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, action) =>
        DeploymentModelNormalizer(action.payload)
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

export default deploymentSlice.reducer;
