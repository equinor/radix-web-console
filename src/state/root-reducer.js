import application from './new_application/reducer';
import applications from './new_applications/reducer';
import applications_old from './applications/reducer'; // TODO: Remove when using Radix API exclusively
import auth from './auth/reducer';
import counters from './counters/reducer';
import job from './job/reducer';
import jobLog from './job-log/reducer'; // TODO: Remove when using Radix API exclusively
import jobLogs from './job-logs/reducer';
import podLog from './pod-log/reducer'; // TODO: Remove when using Radix API exclusively
import pods from './pods/reducer';
import replicaLog from './replica_log/reducer';
import secrets from './secrets/reducer';
import streaming from './streaming/reducer';
import subscriptions from './subscriptions/reducer';

const rootReducer = {
  application,
  applications,
  applications_old,
  auth,
  counters,
  job,
  jobLog,
  jobLogs,
  podLog,
  pods,
  replicaLog,
  secrets,
  streaming,
  subscriptions,
};

export default rootReducer;
