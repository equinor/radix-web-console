import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { actions } from './action-creators';
import {
  enableAlertingFlow,
  disableAlertingFlow,
  updateAlertingFlow,
} from './sagas';

import { api } from '../../api/application-alerting';

describe('application alerting sagas', () => {
  describe('enable alerting flow', () => {
    it('sends confirm, sets snapshot and enables editing if no error and ready is true', () => {
      const action = actions.enableAlertingRequest('fakeApp');
      const response = { ready: true };

      return expectSaga(enableAlertingFlow, action)
        .provide([[call(api.enableAlerting, action.meta), response]])
        .put(actions.enableAlertingConfirm(response))
        .put(actions.setAlertingSnapshot(response))
        .put(actions.editAlertingEnable(response))
        .run();
    });

    it('sends confirm, sets snapshot if no error and ready is false', () => {
      const action = actions.enableAlertingRequest('fakeApp');
      const response = { ready: false };

      return expectSaga(enableAlertingFlow, action)
        .provide([[call(api.enableAlerting, action.meta), response]])
        .put(actions.enableAlertingConfirm(response))
        .put(actions.setAlertingSnapshot(response))
        .not.put(actions.editAlertingEnable(response))
        .run();
    });

    it('sends fail if there is an error', () => {
      const action = actions.enableAlertingRequest('fakeApp');
      const error = new Error('error');

      return expectSaga(enableAlertingFlow, action)
        .provide([[call(api.enableAlerting, action.meta), throwError(error)]])
        .put(actions.enableAlertingFail(error.message))
        .run();
    });
  });

  describe('disable alerting flow', () => {
    it('sends confirm, sets snapshot and disables editing if no error', () => {
      const action = actions.disableAlertingRequest('fakeApp');
      const response = {};

      return expectSaga(disableAlertingFlow, action)
        .provide([[call(api.disableAlerting, action.meta), response]])
        .put(actions.disableAlertingConfirm(response))
        .put(actions.setAlertingSnapshot(response))
        .put(actions.editAlertingDisable(response))
        .run();
    });

    it('sends fail if there is an error', () => {
      const action = actions.disableAlertingRequest('fakeApp');
      const error = new Error('error');

      return expectSaga(disableAlertingFlow, action)
        .provide([[call(api.disableAlerting, action.meta), throwError(error)]])
        .put(actions.disableAlertingFail(error.message))
        .run();
    });
  });

  describe('update alerting flow', () => {
    it('sends confirm, sets snapshot and disables editing if no error', () => {
      const action = actions.updateAlertingRequest('fakeApp', {});
      const response = {};

      return expectSaga(updateAlertingFlow, action)
        .provide([[call(api.updateAlerting, action.meta), response]])
        .put(actions.updateAlertingConfirm(response))
        .put(actions.setAlertingSnapshot(response))
        .put(actions.editAlertingDisable(response))
        .run();
    });

    it('sends fail if there is an error', () => {
      const action = actions.updateAlertingRequest('fakeApp', {});
      const error = new Error('error');

      return expectSaga(updateAlertingFlow, action)
        .provide([[call(api.updateAlerting, action.meta), throwError(error)]])
        .put(actions.updateAlertingFail(error.message))
        .run();
    });
  });
});
