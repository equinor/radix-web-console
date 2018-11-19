import applications from './new_applications/reducer';
import applications_old from './applications/reducer';
import auth from './auth/reducer';
import counters from './counters/reducer';
import jobLog from './job-log/reducer';
import podLog from './pod-log/reducer';
import pods from './pods/reducer';
import secrets from './secrets/reducer';
import streaming from './streaming/reducer';
import subscriptions from './subscriptions/reducer';

const rootReducer = {
  applications,
  applications_old,
  auth,
  counters,
  jobLog,
  podLog,
  pods,
  secrets,
  streaming,
  subscriptions,
};

export default rootReducer;
