import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { createApp } from '../../api/apps';
import actionCreators from './action-creators';
import { createAppFlow } from './sagas';

describe('application create sagas', () => {
  describe('create application flow', () => {
    it('sends confirm if no error', () => {
      const fakeApp = {
        adGroups: 'HEY',
        sharedSecret: 'LE SEKRET',
      };
      const action = actionCreators.addAppRequest(fakeApp);

      return expectSaga(createAppFlow, action)
        .provide([[matchers.call.fn(createApp), action]])
        .put(actionCreators.addAppConfirm(action))
        .run();
    });

    it('sends fail if there is an error', () => {
      const fakeApp = {
        adGroups: 'HEY',
        sharedSecret: 'LE SEKRET',
      };
      const action = actionCreators.addAppRequest(fakeApp);
      const error = new Error('error');

      return expectSaga(createAppFlow, action)
        .provide([[matchers.call.fn(createApp), throwError(error)]])
        .put(actionCreators.addAppFail(error.toString()))
        .run();
    });
  });
});
