import applications from './applications/reducer';
import auth from './auth/reducer';
import counters from './counters/reducer';
import pods from './pods/reducer';
import secrets from './secrets/reducer';
import streaming from './streaming/reducer';
import log from './log/reducer';

const rootReducer = {
  applications,
  auth,
  counters,
  pods,
  secrets,
  streaming,
  log
};

export default rootReducer;
