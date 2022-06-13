import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { EnvironmentScheduledBatchesActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import type { RootState } from '../../init/store';
import { arrayNormalizer } from '../../models/model-utils';
import type { ScheduledBatchSummaryModel } from '../../models/scheduled-batch-summary';
import { ScheduledBatchSummaryModelNormalizer } from '../../models/scheduled-batch-summary/normalizer';

const initialState: Array<ScheduledBatchSummaryModel> = [];

const snapshotAction = createAction<Array<ScheduledBatchSummaryModel>>(
  EnvironmentScheduledBatchesActionTypes.ENVIRONMENT_SCHEDULED_BATCHES_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const environmentScheduledBatchesSlice = createSlice({
  name: 'environmentscheduledbatches',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (state, action) =>
        arrayNormalizer(
          action.payload,
          ScheduledBatchSummaryModelNormalizer,
          state
        )
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta>).meta
          .resourceName === 'ENVIRONMENT_SCHEDULED_BATCHES'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedEnvironmentScheduledBatches = createSelector(
  (state: RootState) => state.environmentScheduledBatches,
  (environmentScheduledBatches) => environmentScheduledBatches
);

export default environmentScheduledBatchesSlice.reducer;
