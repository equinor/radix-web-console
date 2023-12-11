import { all } from 'redux-saga/effects';

import { actions } from './action-creators';

import { restartSagaFactory } from '../restart-base/sagas';
import { startSagaFactory } from '../start-base/sagas';
import { stopSagaFactory } from '../stop-base/sagas';
import {
  restartEnvironment,
  startEnvironment,
  stopEnvironment,
} from '../../api/env';

const [{ startWatch }, { stopWatch }, { restartWatch }] = [
  startSagaFactory('ENVIRONMENT', actions.start, startEnvironment),
  stopSagaFactory('ENVIRONMENT', actions.stop, stopEnvironment),
  restartSagaFactory('ENVIRONMENT', actions.restart, restartEnvironment),
];

export default function* environmentSaga() {
  yield all([startWatch(), stopWatch(), restartWatch()]);
}
