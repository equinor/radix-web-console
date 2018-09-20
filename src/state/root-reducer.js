import applications from './applications/reducer';
import auth from './auth/reducer';
import buildLog from './pod-log/reducer';
import counters from './counters/reducer';
import podLog from './pod-log/reducer';
import pods from './pods/reducer';
import secrets from './secrets/reducer';
import streaming from './streaming/reducer';

const rootReducer = {
  applications,
  auth,
  buildLog,
  counters,
  podLog,
  pods,
  secrets,
  streaming,
};

export default rootReducer;
