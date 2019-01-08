import { all } from 'redux-saga/effects';

import applications from './applications/sagas';
import applicationCreation from './applicationCreation/sagas';
import auth from './auth/sagas';
import counters from './counters/sagas';
import secrets from './secrets/sagas';
import subscriptions from './subscriptions/sagas';

export default function* rootSaga() {
  yield all([
    applicationCreation(),
    auth(),
    counters(),
    applications(),
    secrets(),
    subscriptions(),
  ]);
}
