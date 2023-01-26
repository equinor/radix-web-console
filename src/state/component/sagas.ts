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

const [{ startWatch }, { stopWatch }, { restartWatch }] = [
  startSagaFactory('COMPONENT', actions.start, startComponent),
  stopSagaFactory('COMPONENT', actions.stop, stopComponent),
  restartSagaFactory('COMPONENT', actions.restart, restartComponent),
];

export default function* componentSaga() {
  yield all([startWatch(), stopWatch(), restartWatch()]);
}
