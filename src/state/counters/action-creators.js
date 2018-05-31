import types from './types';

export const incrementSyncCounter = () => ({
  type: types.COUNTERS_SYNC_INCREMENT,
});

export const requestIncrementAsyncCounter = () => ({
  type: types.COUNTERS_ASYNC_REQUEST_INCREMENT,
});

export const commitIncrementAsyncCounter = howMuch => ({
  type: types.COUNTERS_ASYNC_COMMIT_INCREMENT,
  howMuch,
});
