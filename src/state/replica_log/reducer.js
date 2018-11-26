import actionTypes from './action-types';
import subscriptionsActionTypes from '../subscriptions/action-types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REPLICA_LOG_SNAPSHOT:
      return action.payload;

    case subscriptionsActionTypes.UNSUBSCRIBE:
      return action.resourceName === 'REPLICA_LOG' ? initialState : state;

    default:
      return state;
  }
};
