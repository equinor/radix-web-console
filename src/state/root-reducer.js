import application from './application/reducer';
import applicationCreation from './application-creation/reducer';
import applications from './applications/reducer';
import auth from './auth/reducer';
import counters from './counters/reducer';
import deployments from './deployments/reducer';
import environment from './environment/reducer';
import job from './job/reducer';
import jobLogs from './job-logs/reducer';
import replicaLog from './replica_log/reducer';
import secrets from './secrets/reducer';
import subscriptions from './subscriptions/reducer';

const rootReducer = {
  application,
  applicationCreation,
  applications,
  auth,
  counters,
  deployments,
  environment,
  job,
  jobLogs,
  replicaLog,
  secrets,
  subscriptions,
};

export default rootReducer;
