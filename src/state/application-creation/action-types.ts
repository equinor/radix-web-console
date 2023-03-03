import { defineRequestActions } from '../state-utils/request';

export const actionTypes = Object.freeze({
  ...defineRequestActions('APP_CREATION'),
});
