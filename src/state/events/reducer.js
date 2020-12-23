import actionTypes from './action-types';

import subscriptionsActionTypes from '../subscriptions/action-types';
import eventNormaliser from '../../models/event/normaliser';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EVENTS_SNAPSHOT:
      return action.payload.map((event) => eventNormaliser(event));

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'EVENTS' ? initialState : state;

    default:
      return state;
  }
};
