import update from 'immutability-helper';

import actionTypes from './action-types';

import { ApplicationSummaryFactory } from '../../models/factories';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.APPS_SNAPSHOT:
      return action.payload.map(ApplicationSummaryFactory);

    case actionTypes.APPS_ADD:
      return update(state, {
        $push: ApplicationSummaryFactory(action.payload),
      });

    case actionTypes.APPS_MODIFY: {
      const idx = state.findIndex(app => app.name === action.payload.name);
      const updatedApp = ApplicationSummaryFactory(action.payload);
      return update(state, { $splice: [[idx, 1, updatedApp]] });
    }

    case actionTypes.APPS_REMOVE: {
      const idx = state.findIndex(app => app.name === action.payload.name);
      return update(state, { $splice: [[idx, 1]] });
    }

    default:
      return state;
  }
};
