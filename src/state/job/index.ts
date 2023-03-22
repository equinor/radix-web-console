import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { JobActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import { ApiResourceKey } from '../../api/resources';
import type { RootState } from '../../init/store';
import type { JobModel } from '../../models/job';
import { JobModelNormalizer } from '../../models/job/normalizer';
import { ProgressStatus } from '../../models/progress-status';
import { StepModel } from '../../models/step';

const initialState: JobModel = {
  name: '',
  pipeline: '',
  status: ProgressStatus.Unknown,
  created: new Date(0),
};

const snapshotAction = createAction<JobModel | unknown>(
  JobActionTypes.JOB_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, { payload }) => JobModelNormalizer(payload))
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'JOB'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedJob = createSelector(
  (state: RootState) => state.job,
  (job) => job
);

export const getStep = (state: RootState, name: string): StepModel =>
  getMemoizedJob(state).steps?.find((x) => x.name === name);

export const reducer = jobSlice.reducer;
export default reducer;
