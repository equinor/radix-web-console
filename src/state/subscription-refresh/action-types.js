import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  ...defineRequestActions('SUBSCRIPTIONS_REFRESH'),
});
