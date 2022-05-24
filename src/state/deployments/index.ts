import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DeploymentsActionTypes } from './action-types';

import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import type { RootState } from '../../init/store';
import type { DeploymentSummaryModel } from '../../models/deployment-summary';
import { DeploymentSummaryModelNormalizer } from '../../models/deployment-summary/normalizer';
import { arrayNormalizer } from '../../models/model-utils';

const initialState: Array<DeploymentSummaryModel> = [];

const deploymentsSlice = createSlice({
  name: 'deployments',
  initialState,
  reducers: {},
  extraReducers: {
    [DeploymentsActionTypes.DEPLOYMENTS_SNAPSHOT](
      _,
      action: PayloadAction<Array<DeploymentSummaryModel | unknown>>
    ) {
      return arrayNormalizer(
        action.payload,
        DeploymentSummaryModelNormalizer,
        initialState
      );
    },
    [SubscriptionsActionTypes.SUBSCRIPTION_ENDED](
      state,
      action: PayloadAction<unknown> & { resourceName: string }
    ) {
      return action.resourceName === 'DEPLOYMENTS' ? initialState : state;
    },
  },
});

export const getMemoizedDeployments = createSelector(
  (state: RootState) => state.deployments,
  (deployments) => deployments
);

export default deploymentsSlice.reducer;
