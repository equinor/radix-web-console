import { all } from 'redux-saga/effects';

import counters from './counters/sagas';

export default function* rootSaga() {
  yield all([counters()]);
}
