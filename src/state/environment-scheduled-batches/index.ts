import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EnvironmentScheduledBatchesActionTypes } from './action-types';

import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import type { RootState } from '../../init/store';
import { arrayNormalizer } from '../../models/model-utils';
import type { ScheduledBatchSummaryModel } from '../../models/scheduled-batch-summary';
import { ScheduledBatchSummaryModelNormalizer } from '../../models/scheduled-batch-summary/normalizer';

const initialState: Array<ScheduledBatchSummaryModel> = [];

const environmentScheduledBatchesSlice = createSlice({
  name: 'environmentscheduledbatches',
  initialState,
  reducers: {},
  extraReducers: {
    [EnvironmentScheduledBatchesActionTypes.ENVIRONMENT_SCHEDULED_BATCHES_SNAPSHOT](
      state,
      action: PayloadAction<Array<ScheduledBatchSummaryModel | unknown>>
    ) {
      return arrayNormalizer(
        action.payload,
        ScheduledBatchSummaryModelNormalizer,
        state
      );
    },
    [SubscriptionsActionTypes.SUBSCRIPTION_ENDED](
      state,
      action: PayloadAction<unknown> & { resourceName: string }
    ) {
      return action.resourceName === 'ENVIRONMENT_SCHEDULED_BATCHES'
        ? initialState
        : state;
    },
  },
});

export const getMemoizedEnvironmentScheduledBatches = createSelector(
  (state: RootState) => state.environmentScheduledBatches,
  (environmentScheduledBatches) => environmentScheduledBatches
);

export default environmentScheduledBatchesSlice.reducer;
