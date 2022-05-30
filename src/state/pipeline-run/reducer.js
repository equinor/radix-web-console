import actionTypes from './action-types';
import { SubscriptionsActionTypes } from '../subscriptions/action-types';
import { PipelineRunModelNormalizer } from '../../models/pipeline-run/normalizer';

const initialState = null;

export const pipelineRunReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PIPELINE_RUN_SNAPSHOT:
      return PipelineRunModelNormalizer(action.payload);

    case SubscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'PIPELINE_RUN' ? initialState : state;

    default:
      return state;
  }
};

export default pipelineRunReducer;
