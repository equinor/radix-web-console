import application from './application/reducer';
import applicationCreation from './application-creation/reducer';
import deployment from './deployment';
import deployments from './deployments';
import environment from './environment/reducer';
import environmentScheduledBatches from './environment-scheduled-batches';
import environmentScheduledJobs from './environment-scheduled-jobs';
import events from './events';
import job from './job/reducer';
import component from './component/reducer';
import jobCreation from './job-creation/reducer';
import jobLogs from './job-logs/reducer';
import jobs from './jobs/reducer';
import secrets from './secrets/reducer';
import subscriptions from './subscriptions/reducer';
import subscriptionRefresh from './subscription-refresh/reducer';
import favouriteApplications from './applications-favourite';
import lastKnownApplications from './applications-lastknown';
import environmentAlerting from './environment-alerting/reducer';
import applicationAlerting from './application-alerting/reducer';
import oauthAuxiliaryResource from './oauth-auxiliary-resource/reducer';

const rootReducer = {
  application,
  applicationCreation,
  deployment,
  deployments,
  environment,
  environmentScheduledBatches,
  environmentScheduledJobs,
  events,
  component,
  job,
  jobCreation,
  jobLogs,
  jobs,
  secrets,
  subscriptionRefresh, // TODO: Move into subscriptions reducer
  subscriptions,
  favouriteApplications,
  lastKnownApplications,
  environmentAlerting,
  applicationAlerting,
  oauthAuxiliaryResource,
};

export default rootReducer;
