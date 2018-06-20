import applications from './applications/reducer';
import auth from './auth/reducer';
import counters from './counters/reducer';
import streaming from './streaming/reducer';

const rootReducer = {
  applications,
  auth,
  counters,
  streaming,
};

export default rootReducer;
