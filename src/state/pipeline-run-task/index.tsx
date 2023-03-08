import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { PipelineRunTaskActionTypes } from './action-types';

import { ActionType } from '../state-utils/action-creators';
import {
  SubscriptionsActionMeta,
  SubscriptionsActionTypes,
} from '../subscriptions/action-types';
import { ApiResourceKey } from '../../api/resources';
import { RootState } from '../../init/store';
import { PipelineRunTaskModel } from '../../models/pipeline-run-task';
import { PipelineRunTaskModelNormalizer } from '../../models/pipeline-run-task/normalizer';

const initialState: PipelineRunTaskModel = null;

const snapshotAction = createAction<PipelineRunTaskModel | unknown>(
  PipelineRunTaskActionTypes.PIPELINE_RUN_TASK_SNAPSHOT
);
const subscriptionEndedAction = createAction(
  SubscriptionsActionTypes.SUBSCRIPTION_ENDED
);

const pipelineRunTaskSlice = createSlice({
  name: 'pipelineRunTask',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(snapshotAction, (_, action) =>
        PipelineRunTaskModelNormalizer(action.payload)
      )
      .addCase(subscriptionEndedAction, (state, action) =>
        (action as ActionType<never, SubscriptionsActionMeta<ApiResourceKey>>)
          .meta.resourceName === 'PIPELINE_RUN_TASK'
          ? initialState
          : state
      )
      .addDefaultCase((state) => state),
});

export const getMemoizedPipelineRunTask = createSelector(
  (state: RootState) => state.pipelineRunTask,
  (pipelineRunTask) => pipelineRunTask
);

export const reducer = pipelineRunTaskSlice.reducer;
export default reducer;
