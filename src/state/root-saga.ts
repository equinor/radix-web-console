import { all } from 'redux-saga/effects';

import subscriptionRefresh from './subscription-refresh/sagas';
import subscriptions from './subscriptions/sagas';

export function* rootSaga() {
  yield all([
    subscriptionRefresh(), // TODO: Move into subscriptions() saga
    subscriptions(),
  ]);
}
