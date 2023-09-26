import actionTypes from './action-types';

import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import { arrayNormalizer } from '../../models/model-utils';
import { PipelineRunModelNormalizer } from '../../models/radix-api/jobs/pipeline-run/normalizer';

const initialState = [];

export const pipelineRunsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PIPELINE_RUNS_SNAPSHOT:
      return arrayNormalizer(action.payload, PipelineRunModelNormalizer, state);

    case SubscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.meta.resourceName === 'PIPELINE_RUNS'
        ? initialState
        : state;

    default:
      return state;
  }
};

export default pipelineRunsReducer;
