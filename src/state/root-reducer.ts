import application from './application';
import component from './component/reducer';
import jobCreation from './job-creation/reducer';
import oauthAuxiliaryResource from './oauth-auxiliary-resource/reducer';
import subscriptionRefresh from './subscription-refresh';
import subscriptions from './subscriptions';

export const rootReducer = {
  application,
  component,
  jobCreation,
  oauthAuxiliaryResource,
  subscriptionRefresh, // TODO: Move into subscriptions reducer
  subscriptions,
};
