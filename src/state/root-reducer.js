import application from './application/reducer';
import applicationCreation from './application-creation/reducer';
import applications from './applications/reducer';
import auth from './auth/reducer';
import counters from './counters/reducer';
import deployment from './deployment/reducer';
import deployments from './deployments/reducer';
import environment from './environment/reducer';
import job from './job/reducer';
import jobCreation from './job-creation/reducer';
import jobLogs from './job-logs/reducer';
import jobs from './jobs/reducer';
import replicaLog from './replica_log/reducer';
import secrets from './secrets/reducer';
import subscriptions from './subscriptions/reducer';
import subscriptionRefresh from './subscription-refresh/reducer';

const rootReducer = {
  application,
  applicationCreation,
  applications,
  auth,
  counters,
  deployment,
  deployments,
  environment,
  job,
  jobCreation,
  jobLogs,
  jobs,
  replicaLog,
  secrets,
  subscriptionRefresh,
  subscriptions,
};

export default rootReducer;
