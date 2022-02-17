import actionTypes from './action-types';

import subscriptionsActionTypes from '../subscriptions/action-types';
import { DeploymentSummaryModelNormalizer } from '../../models/deployment-summary/normalizer';

const initialState = [];

export const deploymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEPLOYMENTS_SNAPSHOT:
      return action.payload.map(DeploymentSummaryModelNormalizer);

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'DEPLOYMENTS' ? initialState : state;

    default:
      return state;
  }
};

export default deploymentsReducer;
