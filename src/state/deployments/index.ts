import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { DeploymentsActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import type { RootState } from '../../init/store';
import type { DeploymentSummaryModel } from '../../models/deployment-summary';
import { DeploymentSummaryModelNormalizer } from '../../models/deployment-summary/normalizer';
import { arrayNormalizer } from '../../models/model-utils';

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
      .addCase(snapshotAction, (_, action) =>
        arrayNormalizer(
          action.payload,
          DeploymentSummaryModelNormalizer,
          initialState
        )
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta>).meta
          .resourceName === 'DEPLOYMENTS'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedDeployments = createSelector(
  (state: RootState) => state.deployments,
  (deployments) => deployments
);

export default deploymentsSlice.reducer;
