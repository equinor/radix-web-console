import { defineRequestActions } from '../state-utils/request';

export const actionTypes = Object.freeze({
  ...defineRequestActions('SUBSCRIPTIONS_REFRESH'),
});
