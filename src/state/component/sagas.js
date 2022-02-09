import { all, call, put, takeLatest } from 'redux-saga/effects';

import actionTypes from './action-types';
import actionCreators from './action-creators';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';
import {
  startComponent,
  stopComponent,
  restartComponent,
} from '../../api/components';
import { restartSagaFactory } from '../restart-utils/sagas';

function* startComponentWatch() {
  yield takeLatest(actionTypes.COMPONENT_START_REQUEST, startComponentFlow);
}

export function* startComponentFlow(action) {
  try {
    const startedComponent = yield call(startComponent, action.component);
    yield put(actionCreators.startComponentConfirm(startedComponent));
    yield put(subscriptionsRefreshRequest());
  } catch (e) {
    yield put(actionCreators.startComponentFail(e.toString()));
  }
}

function* stopComponentWatch() {
  yield takeLatest(actionTypes.COMPONENT_STOP_REQUEST, stopComponentFlow);
}

export function* stopComponentFlow(action) {
  try {
    const stoppedComponent = yield call(stopComponent, action.component);
    yield put(actionCreators.stoppedComponentConfirm(stoppedComponent));
    yield put(subscriptionsRefreshRequest());
  } catch (e) {
    yield put(actionCreators.stoppedComponentFail(e.toString()));
  }
}

const { restartWatch } = restartSagaFactory(
  'COMPONENT',
  actionCreators,
  restartComponent
);

export default function* componentSaga() {
  yield all([startComponentWatch(), stopComponentWatch(), restartWatch()]);
}
