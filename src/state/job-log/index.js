import states from '../state-utils/request-states';

export const getStatus = state => state.jobLog.status;

export const getLog = state => {
  if (getStatus(state) === states.FAILURE) {
    return `Error fetching log:\n\n${state.jobLog.lastError}`;
  }

  return state.jobLog.payload;
};
