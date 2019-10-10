import { all } from 'redux-saga/effects';

import application from './application/sagas';
import applicationCreation from './application-creation/sagas';
import auth from './auth/sagas';
import counters from './counters/sagas';
import environment from './environment/sagas';
import jobCreation from './job-creation/sagas';
import component from './component/sagas';
import secrets from './secrets/sagas';
import subscriptionRefresh from './subscription-refresh/sagas';
import subscriptions from './subscriptions/sagas';

export default function* rootSaga() {
  yield all([
    applicationCreation(),
    application(),
    auth(),
    counters(),
    environment(),
    component(),
    jobCreation(),
    secrets(),
    subscriptionRefresh(),
    subscriptions(),
  ]);
}
