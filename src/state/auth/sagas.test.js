import { delay } from 'redux-saga';
import { put, call, select, runSaga } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import watcherSaga, { signInFlow, signOutFlow } from './sagas';
import * as actionCreators from './action-creators';
import { login, logout, getSignedInADProfile } from '../../api/auth';
import { activeDirectoryProfileToUser } from '../../utils/user';

describe('auth sagas', () => {
  describe('sign in flow', () => {
    it('succeeds if user auth is cached', () => {
      const fakeADProfile = {
        userName: 'alice@example.com',
        profile: {},
      };

      const fakeUser = activeDirectoryProfileToUser(fakeADProfile);

      return expectSaga(signInFlow, { payload: false })
        .provide([
          [call(getSignedInADProfile), fakeADProfile],
          [call(login), null],
        ])
        .call(getSignedInADProfile)
        .put(actionCreators.loginSuccess(fakeUser))
        .run();
    });

    /**
     * This test is a bit messy given that the auth library (adal) stores the
     * auth state is session storage, and multiple calls to
     * `getSignedInADProfile()` are made during the login flow, yielding
     * different results
     */
    it('performs remote auth request if auth not cached', () => {
      const fakeADProfile = {
        userName: 'alice@example.com',
        profile: {},
      };

      const fakeUser = activeDirectoryProfileToUser(fakeADProfile);

      // Keep track of how many times getSignedInADProfile is called
      let getSignedInADProfileCallCount = 0;

      return expectSaga(signInFlow, { payload: false })
        .provide({
          call(effect, next) {
            if (effect.fn === getSignedInADProfile) {
              getSignedInADProfileCallCount++;

              // On the second call (i.e. after remote auth request), return
              // an authenticated user profile
              if (getSignedInADProfileCallCount === 2) {
                return fakeADProfile;
              }

              // Return nothing to simulate "logged out" status
              return null;
            } else if (effect.fn === delay) {
              // We also cancel the `delay()` effect to avoid a test timeout
              return null;
            }

            return next();
          },
        })
        .call(getSignedInADProfile)
        .call(login)
        .put(actionCreators.loginSuccess(fakeUser))
        .run();
    });
  });
});
