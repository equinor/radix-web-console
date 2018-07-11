import actionTypes from './action-types';

export const requestFetchLog = pod => ({
  type: actionTypes.UPDATE_LOG_REQUEST,
  pod
});

export const commitFetchLog = log => ({
  type: actionTypes.UPDATE_LOG_COMMIT,
  log
});
