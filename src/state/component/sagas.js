import { all } from 'redux-saga/effects';

import actionCreators from './action-creators';
import {
  startComponent,
  stopComponent,
  restartComponent,
} from '../../api/components';
import { restartSagaFactory } from '../restart-utils/sagas';
import { startSagaFactory } from '../start-utils/sagas';
import { stopSagaFactory } from '../stop-utils/sagas';

const { startWatch } = startSagaFactory(
  'COMPONENT',
  actionCreators.start,
  startComponent
);

const { stopWatch } = stopSagaFactory(
  'COMPONENT',
  actionCreators.stop,
  stopComponent
);

const { restartWatch } = restartSagaFactory(
  'COMPONENT',
  actionCreators.restart,
  restartComponent
);

export default function* componentSaga() {
  yield all([startWatch(), stopWatch(), restartWatch()]);
}
