import actionTypes from './action-types';

import subscriptionsActionTypes from '../subscriptions/action-types';
import deploymentSummaryNormaliser from '../../models/deployment-summary/normaliser';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEPLOYMENTS_SNAPSHOT:
      return action.payload.map(deploymentSummaryNormaliser);

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'DEPLOYMENTS' ? initialState : state;

    default:
      return state;
  }
};
