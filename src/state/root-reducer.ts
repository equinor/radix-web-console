import application from './application';
import component from './component/reducer';
import oauthAuxiliaryResource from './oauth-auxiliary-resource/reducer';
import subscriptionRefresh from './subscription-refresh';
import subscriptions from './subscriptions';

export const rootReducer = {
  application,
  component,
  oauthAuxiliaryResource,
  subscriptionRefresh, // TODO: Move into subscriptions reducer
  subscriptions,
};
