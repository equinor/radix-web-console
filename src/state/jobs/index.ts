import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { JobsActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import { ApiResourceKey } from '../../api/resources';
import type { RootState } from '../../init/store';
import type { JobSummaryModel } from '../../models/job-summary';
import { JobSummaryModelNormalizer } from '../../models/job-summary/normalizer';
import { arrayNormalizer } from '../../models/model-utils';

const initialState: Array<JobSummaryModel> = [];

const snapshotAction = createAction<Array<JobSummaryModel | unknown>>(
  JobsActionTypes.JOBS_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (state, action) =>
        arrayNormalizer(action.payload, JobSummaryModelNormalizer, state)
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'JOBS'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedJobs = createSelector(
  (state: RootState) => state.jobs,
  (jobs) => jobs
);

export default jobsSlice.reducer;
