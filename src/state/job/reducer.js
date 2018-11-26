import actionTypes from './action-types';

export default (state = null, action) => {
  switch (action.type) {
    case actionTypes.JOB_SNAPSHOT: {
      return action.payload;
    }

    default:
      return state;
  }
};
