import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  SUBSCRIBE: 'SUBSCRIBE',
  ...defineRequestActions('SUBSCRIPTIONS_REFRESH'),
  UNSUBSCRIBE: 'UNSUBSCRIBE',
});
