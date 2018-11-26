import actionTypes from './action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.JOB_LOGS_SNAPSHOT: {
      const newState = {};
      action.payload.forEach(component => {
        newState[component.name] = component;
      });
      return newState;
    }

    default:
      return state;
  }
};
