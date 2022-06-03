import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { JobLogsActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import type { RootState } from '../../init/store';

type JobLogs = { name: string; podname: string; log: string; sort: number };

const initialState: { [key: string]: JobLogs } = {};

const snapshotAction = createAction<Array<JobLogs>>(
  JobLogsActionTypes.JOB_LOGS_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const jobLogsSlice = createSlice({
  name: 'jobLogs',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(
        snapshotAction,
        (_, action) =>
          action.payload?.reduce((obj, x) => {
            obj[x.name] = x;
            return obj;
          }, {}) ?? initialState
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType).meta.resourceName === 'JOB_LOGS'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedJobLogs = createSelector(
  (state: RootState) => state.jobLogs,
  (jobLogs) => jobLogs
);

export function getJobStepLog(state: RootState, stepName: string): string {
  return getMemoizedJobLogs(state)[stepName]?.log;
}

export default jobLogsSlice.reducer;
