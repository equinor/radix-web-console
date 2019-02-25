import update from 'immutability-helper';

import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';

import { ApplicationSummaryNormaliser } from '../../models';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPS_SNAPSHOT:
      return action.payload.map(ApplicationSummaryNormaliser);

    case actionTypes.APPS_ADD:
      return update(state, {
        $push: ApplicationSummaryNormaliser(action.payload),
      });

    case actionTypes.APPS_MODIFY: {
      const idx = state.findIndex(app => app.name === action.payload.name);
      const updatedApp = ApplicationSummaryNormaliser(action.payload);
      return update(state, { $splice: [[idx, 1, updatedApp]] });
    }

    case actionTypes.APPS_REMOVE: {
      const idx = state.findIndex(app => app.name === action.payload.name);
      return update(state, { $splice: [[idx, 1]] });
    }

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'APPS' ? initialState : state;

    default:
      return state;
  }
};
