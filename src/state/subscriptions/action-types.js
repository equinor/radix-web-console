import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
  ...defineRequestActions('SUBSCRIPTIONS_REFRESH'),
});
