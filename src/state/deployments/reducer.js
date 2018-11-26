import actionTypes from './action-types';

import { DeploymentSummaryFactory } from '../../models/factories';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.DEPLOYMENTS_SNAPSHOT:
      return action.payload.map(DeploymentSummaryFactory);

    default:
      return state;
  }
};
