import { all } from 'redux-saga/effects';

import applications from './applications/sagas';
import applicationCreation from './application-creation/sagas';
import auth from './auth/sagas';
import counters from './counters/sagas';
import environment from './environment/sagas';
import jobCreation from './job-creation/sagas';
import secrets from './secrets/sagas';
import subscriptionRefresh from './subscription-refresh/sagas';
import subscriptions from './subscriptions/sagas';

export default function* rootSaga() {
  yield all([
    applicationCreation(),
    applications(),
    auth(),
    counters(),
    environment(),
    jobCreation(),
    secrets(),
    subscriptionRefresh(),
    subscriptions(),
  ]);
}
