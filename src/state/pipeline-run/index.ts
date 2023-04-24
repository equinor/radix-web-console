import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { PipelineRunActionTypes } from './action-types';

import type { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import { ApiResourceKey } from '../../api/resources';
import type { RootState } from '../../init/store';
import { PipelineRunModel } from '../../models/pipeline-run';
import { PipelineRunModelNormalizer } from '../../models/pipeline-run/normalizer';
import { ProgressStatus } from '../../models/progress-status';

const initialState: PipelineRunModel = {
  env: '',
  name: '',
  status: ProgressStatus.Unknown,
};

const snapshotAction = createAction<PipelineRunModel | unknown>(
  PipelineRunActionTypes.PIPELINE_RUN_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const pipelineRunSlice = createSlice({
  name: 'pipelineRun',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, { payload }) =>
        PipelineRunModelNormalizer(payload)
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'PIPELINE_RUN'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedPipelineRun = createSelector(
  (state: RootState) => state.pipelineRun,
  (pipelineRun) => pipelineRun
);

export const reducer = pipelineRunSlice.reducer;
export default reducer;
