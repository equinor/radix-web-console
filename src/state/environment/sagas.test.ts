import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { actions } from './action-creators';
import { createDeleteEnvironmentFlow } from './sagas';

import { deleteEnvironment } from '../../api/env';

describe('environment delete sagas', () => {
  describe('create application flow', () => {
    it('sends confirm if no error', () => {
      const action = actions.deleteEnvRequest({
        appName: 'fakeApp',
        envName: 'fakeEnv',
      });

      return expectSaga(createDeleteEnvironmentFlow, action)
        .provide([[call.fn(deleteEnvironment), action.meta.env]])
        .put(actions.deleteEnvConfirm(action.meta.env))
        .run();
    });

    it('sends fail if there is an error', () => {
      const action = actions.deleteEnvRequest({
        appName: 'fakeApp',
        envName: 'fakeEnv',
      });
      const error = new Error('error');

      return expectSaga(createDeleteEnvironmentFlow, action)
        .provide([[call.fn(deleteEnvironment), throwError(error)]])
        .put(actions.deleteEnvFail(error.message))
        .run();
    });
  });
});
