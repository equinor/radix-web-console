import { delay } from 'redux-saga';
import { call } from 'redux-saga/effects';
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

      return expectSaga(signInFlow)
        .provide([[call(getSignedInADProfile), fakeADProfile], [call(login)]])
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

      return expectSaga(signInFlow)
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

  describe('sign out flow', () => {
    it('succeeds logging out', () => {
      return (
        expectSaga(signOutFlow)
          // Cancel the delay effect to avoid timing out the Saga
          .provide([[matchers.call.fn(delay)]])
          .call(logout)
          .put(actionCreators.logoutSuccess())
          .run()
      );
    });
  });

  describe('full auth flow', () => {
    it('logs in and out', () => {
      return (
        expectSaga(watcherSaga)
          // Mock the sub-flows
          .provide([[call(signInFlow)], [call(signOutFlow)]])
          .call(signInFlow)
          .call(signOutFlow)
          .dispatch(actionCreators.loginRequest())
          .dispatch(actionCreators.logoutSuccess())
          .silentRun()
      );
    });
  });
});
