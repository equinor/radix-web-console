import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { EnvironmentScheduledJobsActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import type { RootState } from '../../init/store';
import { arrayNormalizer } from '../../models/model-utils';
import type { ScheduledJobSummaryModel } from '../../models/scheduled-job-summary';
import { ScheduledJobSummaryModelNormalizer } from '../../models/scheduled-job-summary/normalizer';

const initialState: Array<ScheduledJobSummaryModel> = [];

const snapshotAction = createAction<Array<ScheduledJobSummaryModel>>(
  EnvironmentScheduledJobsActionTypes.ENVIRONMENT_SCHEDULED_JOBS_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const environmentScheduledJobsSlice = createSlice({
  name: 'environmentscheduledjobs',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (state, action) =>
        arrayNormalizer(
          action.payload,
          ScheduledJobSummaryModelNormalizer,
          state
        )
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta>).meta
          .resourceName === 'ENVIRONMENT_SCHEDULED_JOBS'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedEnvironmentScheduledJobs = createSelector(
  (state: RootState) => state.environmentScheduledJobs,
  (environmentScheduledJobs) => environmentScheduledJobs
);

export default environmentScheduledJobsSlice.reducer;
