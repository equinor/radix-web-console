import applications from './applications/reducer';
import auth from './auth/reducer';
import counters from './counters/reducer';
import pods from './pods/reducer';
import secrets from './secrets/reducer';
import streaming from './streaming/reducer';

const rootReducer = {
  applications,
  auth,
  counters,
  pods,
  secrets,
  streaming,
};

export default rootReducer;
