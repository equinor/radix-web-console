import { all } from 'redux-saga/effects';

import actionCreators from './action-creators';
import { restartAuxiliaryResource } from '../../api/auxiliary-resource';
import { restartSagaFactory } from '../restart-utils/sagas';

const { restartWatch } = restartSagaFactory(
  'AUXILIARY_RESOURCE',
  actionCreators,
  restartAuxiliaryResource
);

export default function* componentSaga() {
  yield all([restartWatch()]);
}
