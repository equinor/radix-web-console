import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import counters from './counters/sagas';

export default function* rootSaga() {
  yield all([auth(), counters()]);
}
