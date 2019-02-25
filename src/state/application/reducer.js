import actionTypes from './action-types';
import applicationsActionTypes from '../applications/action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';
import update from 'immutability-helper';

import { ApplicationNormaliser } from '../../models';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_SNAPSHOT:
      return update(state, {
        $set: { instance: ApplicationNormaliser(action.payload) },
      });

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'APP' ? initialState : state;

    case applicationsActionTypes.APPS_DELETE_COMPLETE:
      return update(state, { $set: { isDeleted: true } });

    default:
      return state;
  }
};
