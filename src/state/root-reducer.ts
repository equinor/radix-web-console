import oauthAuxiliaryResource from './oauth-auxiliary-resource/reducer';
import subscriptionRefresh from './subscription-refresh';
import subscriptions from './subscriptions';

export const rootReducer = {
  oauthAuxiliaryResource,
  subscriptionRefresh, // TODO: Move into subscriptions reducer
  subscriptions,
};
