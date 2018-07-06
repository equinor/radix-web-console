import { all } from 'redux-saga/effects';

import applications from './applications/sagas';
import auth from './auth/sagas';
import counters from './counters/sagas';
import pods from './pods/sagas';
import secrets from './secrets/sagas';

export default function* rootSaga() {
  yield all([applications(), auth(), counters(), pods(), secrets()]);
}
