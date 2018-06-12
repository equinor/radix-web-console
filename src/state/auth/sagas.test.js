import { put, call, select, runSaga } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';

import watcherSaga, { signInFlow, signOutFlow } from './sagas';
import * as actionCreators from './action-creators';
import { login, logout, getSignedInUser } from '../../api/auth';

jest.mock('../../api/auth');

xdescribe('auth sagas', () => {
  describe('sign in flow', () => {
    it('requests remote api login', async () => {
      return expectSaga(signInFlow, {})
        .call(getSignedInUser)
        .provide([
          [call(getSignedInUser), null],
        ])
        .call(login)
        .run();
    });
  });
});
