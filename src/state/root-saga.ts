import { all } from 'redux-saga/effects';

import application from './application/sagas';
import applicationCreation from './application-creation/sagas';
import environment from './environment/sagas';
import jobCreation from './job-creation/sagas';
import component from './component/sagas';
import secrets from './secrets/sagas';
import subscriptionRefresh from './subscription-refresh/sagas';
import subscriptions from './subscriptions/sagas';
import environmentAlerting from './environment-alerting/sagas';
import applicationAlerting from './application-alerting/sagas';
import oauthAuxiliaryResource from './oauth-auxiliary-resource/sagas';

export function* rootSaga() {
  yield all([
    applicationCreation(),
    application(),
    environment(),
    component(),
    jobCreation(),
    secrets(),
    subscriptionRefresh(), // TODO: Move into subscriptions() saga
    subscriptions(),
    environmentAlerting(),
    applicationAlerting(),
    oauthAuxiliaryResource(),
  ]);
}

export default rootSaga;
