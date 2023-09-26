import actionTypes from './action-types';

import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import { arrayNormalizer } from '../../models/model-utils';
import { PipelineRunTaskModelNormalizer } from '../../models/radix-api/jobs/pipeline-run-task/normalizer';

const initialState = [];

export const pipelineRunTasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PIPELINE_RUN_TASKS_SNAPSHOT:
      return arrayNormalizer(
        action.payload,
        PipelineRunTaskModelNormalizer,
        state
      );

    case SubscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.meta.resourceName === 'PIPELINE_RUN_TASKS'
        ? initialState
        : state;

    default:
      return state;
  }
};

export default pipelineRunTasksReducer;
