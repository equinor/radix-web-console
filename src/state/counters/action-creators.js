import actionTypes from './action-types';

export const incrementSyncCounter = () => ({
  type: actionTypes.COUNTERS_SYNC_INCREMENT,
});

export const requestIncrementAsyncCounter = () => ({
  type: actionTypes.COUNTERS_ASYNC_REQUEST_INCREMENT,
});

export const commitIncrementAsyncCounter = howMuch => ({
  type: actionTypes.COUNTERS_ASYNC_COMMIT_INCREMENT,
  howMuch,
});
