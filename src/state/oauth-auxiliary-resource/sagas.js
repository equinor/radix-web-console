import { all } from 'redux-saga/effects';

import actionCreators from './action-creators';
import { restartOAuthAuxiliaryResource } from '../../api/oauth-auxiliary-resource';
import { restartSagaFactory } from '../restart-utils/sagas';

const { restartWatch } = restartSagaFactory(
  'OAUTH_AUXILIARY_RESOURCE',
  actionCreators.restart,
  restartOAuthAuxiliaryResource
);

export default function* componentSaga() {
  yield all([restartWatch()]);
}
