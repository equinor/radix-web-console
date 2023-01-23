import { all } from 'redux-saga/effects';

import { actions } from './action-creators';

import { restartSagaFactory } from '../restart-base/sagas';
import { startSagaFactory } from '../start-base/sagas';
import { stopSagaFactory } from '../stop-base/sagas';
import {
  restartComponent,
  startComponent,
  stopComponent,
} from '../../api/components';

const { restartWatch } = restartSagaFactory(
  'COMPONENT',
  actions.restart,
  restartComponent
);

const { startWatch } = startSagaFactory(
  'COMPONENT',
  actions.start,
  startComponent
);

const { stopWatch } = stopSagaFactory('COMPONENT', actions.stop, stopComponent);

export default function* componentSaga() {
  yield all([startWatch(), stopWatch(), restartWatch()]);
}
