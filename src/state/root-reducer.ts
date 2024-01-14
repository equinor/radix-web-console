import application from './application';
import component from './component/reducer';
import deployments from './deployments';
import jobCreation from './job-creation/reducer';
import oauthAuxiliaryResource from './oauth-auxiliary-resource/reducer';
import subscriptionRefresh from './subscription-refresh';
import subscriptions from './subscriptions';

export const rootReducer = {
  application,
  component,
  deployments,
  jobCreation,
  oauthAuxiliaryResource,
  subscriptionRefresh, // TODO: Move into subscriptions reducer
  subscriptions,
};
