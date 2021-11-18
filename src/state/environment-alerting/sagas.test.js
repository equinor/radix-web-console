import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';
import { api } from '../../api/environment-alerting';
import actionCreators from './action-creators';
import {
  enableAlertingFlow,
  disableAlertingFlow,
  updateAlertingFlow,
} from './sagas';

describe('application alerting sagas', () => {
  describe('enable alerting flow', () => {
    it('sends confirm, sets snapshot and enables editing if no error and ready is true', () => {
      const action = actionCreators.enableAlertingRequest('fakeApp', 'fakeEnv');
      const response = { ready: true };

      return expectSaga(enableAlertingFlow, action)
        .provide([[call(api.enableAlerting, action), response]])
        .put(actionCreators.enableAlertingConfirm(response))
        .put(actionCreators.setAlertingSnapshot(response))
        .put(actionCreators.editAlertingEnable(response))
        .run();
    });

    it('sends confirm, sets snapshot if no error and ready is false', () => {
      const action = actionCreators.enableAlertingRequest('fakeApp', 'fakeEnv');
      const response = { ready: false };

      return expectSaga(enableAlertingFlow, action)
        .provide([[call(api.enableAlerting, action), response]])
        .put(actionCreators.enableAlertingConfirm(response))
        .put(actionCreators.setAlertingSnapshot(response))
        .not.put(actionCreators.editAlertingEnable(response))
        .run();
    });

    it('sends fail if there is an error', () => {
      const action = actionCreators.enableAlertingRequest('fakeApp', 'fakeEnv');
      const error = new Error('error');

      return expectSaga(enableAlertingFlow, action)
        .provide([[call(api.enableAlerting, action), throwError(error)]])
        .put(actionCreators.enableAlertingFail(error.toString()))
        .run();
    });
  });

  describe('disable alerting flow', () => {
    it('sends confirm, sets snapshot and disables editing if no error', () => {
      const action = actionCreators.disableAlertingRequest(
        'fakeApp',
        'fakeEnv'
      );
      const response = {};

      return expectSaga(disableAlertingFlow, action)
        .provide([[call(api.disableAlerting, action), response]])
        .put(actionCreators.disableAlertingConfirm(response))
        .put(actionCreators.setAlertingSnapshot(response))
        .put(actionCreators.editAlertingDisable(response))
        .run();
    });

    it('sends fail if there is an error', () => {
      const action = actionCreators.disableAlertingRequest(
        'fakeApp',
        'fakeEnv'
      );
      const error = new Error('error');

      return expectSaga(disableAlertingFlow, action)
        .provide([[call(api.disableAlerting, action), throwError(error)]])
        .put(actionCreators.disableAlertingFail(error.toString()))
        .run();
    });
  });

  describe('update alerting flow', () => {
    it('sends confirm, sets snapshot and disables editing if no error', () => {
      const action = actionCreators.updateAlertingRequest(
        'fakeApp',
        'fakeEnv',
        {}
      );
      const response = {};
      return expectSaga(updateAlertingFlow, action)
        .provide([[call(api.updateAlerting, action), response]])
        .put(actionCreators.updateAlertingConfirm(response))
        .put(actionCreators.setAlertingSnapshot(response))
        .put(actionCreators.editAlertingDisable(response))
        .run();
    });

    it('sends fail if there is an error', () => {
      const action = actionCreators.updateAlertingRequest(
        'fakeApp',
        'fakeEnv',
        {}
      );
      const error = new Error('error');

      return expectSaga(updateAlertingFlow, action)
        .provide([[call(api.updateAlerting, action), throwError(error)]])
        .put(actionCreators.updateAlertingFail(error.toString()))
        .run();
    });
  });
});
