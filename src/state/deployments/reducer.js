import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';

import { DeploymentSummaryFactory } from 'radix-web-console-models';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEPLOYMENTS_SNAPSHOT:
      return action.payload.map(DeploymentSummaryFactory);

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'DEPLOYMENTS' ? initialState : state;

    default:
      return state;
  }
};
