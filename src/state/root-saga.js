import { all } from 'redux-saga/effects';

import applications from './applications/sagas';
import auth from './auth/sagas';
import counters from './counters/sagas';
import secrets from './secrets/sagas';
import subscriptions from './subscriptions/sagas';

export default function* rootSaga() {
  yield all([applications(), auth(), counters(), secrets(), subscriptions()]);
}
