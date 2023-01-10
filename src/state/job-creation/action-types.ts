import { defineRequestActions } from '../state-utils/request';

export const actionTypes = Object.freeze({
  ...defineRequestActions('JOB_CREATION'),
});

export default actionTypes;
