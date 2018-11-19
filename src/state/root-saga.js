import { all } from 'redux-saga/effects';

import applications from './applications/sagas';
import auth from './auth/sagas';
import jobLog from './job-log/sagas';
import counters from './counters/sagas';
import podLog from './pod-log/sagas';
import pods from './pods/sagas';
import secrets from './secrets/sagas';
import subscriptions from './subscriptions/sagas';

export default function* rootSaga() {
  yield all([
    applications(),
    auth(),
    counters(),
    jobLog(),
    podLog(),
    pods(),
    secrets(),
    subscriptions(),
  ]);
}
