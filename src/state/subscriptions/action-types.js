import { defineRequestActions } from '../state-utils/request';

export default Object.freeze({
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
  SUBSCRIPTION_ENDED: 'SUBSCRIPTION_ENDED',
  ...defineRequestActions('SUBSCRIPTIONS_REFRESH'),
});
