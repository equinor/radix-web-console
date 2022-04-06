import actionTypes from './action-types';

import subscriptionsActionTypes from '../subscriptions/action-types';
import { DeploymentModelNormalizer } from '../../models/deployment/normalizer';

const initialState = null;

const deploymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEPLOYMENT_SNAPSHOT: {
      return DeploymentModelNormalizer(action.payload);
    }

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'DEPLOYMENT' ? initialState : state;

    default:
      return state;
  }
};

export default deploymentReducer;
