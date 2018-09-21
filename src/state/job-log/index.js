import states from '../state-utils/request-states';

export const getStatus = state => state.jobLog.status;

export const getLog = state => {
  switch (getStatus(state)) {
    case states.FAILURE:
      return `Error fetching log:\n\n${state.jobLog.lastError}`;
    case states.IN_PROGRESS:
      return 'Loading…';
    default:
      return state.jobLog.payload;
  }
};
