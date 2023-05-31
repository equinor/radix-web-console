import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { DeploymentsActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import { ApiResourceKey } from '../../api/resources';
import type { RootState } from '../../init/store';
import { arrayNormalizer } from '../../models/model-utils';
import type { DeploymentSummaryModel } from '../../models/radix-api/deployments/deployment-summary';
import { DeploymentSummaryModelNormalizer } from '../../models/radix-api/deployments/deployment-summary/normalizer';

const initialState: Array<DeploymentSummaryModel> = [];

const snapshotAction = createAction<Array<DeploymentSummaryModel>>(
  DeploymentsActionTypes.DEPLOYMENTS_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const deploymentsSlice = createSlice({
  name: 'deployments',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, { payload }) =>
        arrayNormalizer(payload, DeploymentSummaryModelNormalizer, initialState)
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'DEPLOYMENTS'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedDeployments = createSelector(
  (state: RootState) => state.deployments,
  (deployments) => deployments
);

export const reducer = deploymentsSlice.reducer;
export default reducer;
