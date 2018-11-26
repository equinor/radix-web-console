import actionTypes from './action-types';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.REPLICA_LOG_SNAPSHOT:
      return action.payload;

    default:
      return state;
  }
};
