import actionTypes from './action-types';

import subscriptionsActionTypes from '../subscriptions/action-types';
import { EventModelNormalizer } from '../../models/event/normalizer';

const initialState = [];

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EVENTS_SNAPSHOT:
      return action.payload.map((event) => EventModelNormalizer(event));

    case subscriptionsActionTypes.SUBSCRIPTION_ENDED:
      return action.resourceName === 'EVENTS' ? initialState : state;

    default:
      return state;
  }
};

export default eventsReducer;
