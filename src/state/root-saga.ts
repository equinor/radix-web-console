import { all } from 'redux-saga/effects';

import application from './application/sagas';
import jobCreation from './job-creation/sagas';
import component from './component/sagas';
import subscriptionRefresh from './subscription-refresh/sagas';
import subscriptions from './subscriptions/sagas';
import oauthAuxiliaryResource from './oauth-auxiliary-resource/sagas';

export function* rootSaga() {
  yield all([
    application(),
    component(),
    jobCreation(),
    subscriptionRefresh(), // TODO: Move into subscriptions() saga
    subscriptions(),
    oauthAuxiliaryResource(),
  ]);
}
