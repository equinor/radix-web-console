import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EnvironmentScheduledJobsActionTypes } from './action-types';

import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import type { RootState } from '../../init/store';
import { arrayNormalizer } from '../../models/model-utils';
import type { ScheduledJobSummaryModel } from '../../models/scheduled-job-summary';
import { ScheduledJobSummaryModelNormalizer } from '../../models/scheduled-job-summary/normalizer';

const initialState: Array<ScheduledJobSummaryModel> = [];

const environmentScheduledJobsSlice = createSlice({
  name: 'environmentscheduledjobs',
  initialState,
  reducers: {},
  extraReducers: {
    [EnvironmentScheduledJobsActionTypes.ENVIRONMENT_SCHEDULED_JOBS_SNAPSHOT](
      state,
      action: PayloadAction<Array<ScheduledJobSummaryModel | unknown>>
    ) {
      return arrayNormalizer(
        action.payload,
        ScheduledJobSummaryModelNormalizer,
        state
      );
    },
    [SubscriptionsActionTypes.SUBSCRIPTION_ENDED](
      state,
      action: PayloadAction<unknown> & { resourceName: string }
    ) {
      return action.resourceName === 'ENVIRONMENT_SCHEDULED_JOBS'
        ? initialState
        : state;
    },
  },
});

export const getMemoizedEnvironmentScheduledJobs = createSelector(
  (state: RootState) => state.environmentScheduledJobs,
  (environmentScheduledJobs) => environmentScheduledJobs
);

export default environmentScheduledJobsSlice.reducer;
