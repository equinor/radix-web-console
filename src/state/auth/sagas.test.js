import { delay } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { signInFlow, signOutFlow } from './sagas';
import * as actionCreators from './action-creators';
import {
  login,
  logout,
  isAuthenticated,
  getSignedInADProfile,
} from '../../api/auth';
import { activeDirectoryProfileToUser } from '../../utils/user';

describe('auth sagas', () => {
  const fakeADProfile = {
    userName: 'alice@example.com',
    profile: {},
  };

  describe('sign in flow', () => {
    it('succeeds if user auth is cached', () => {
      const fakeUser = activeDirectoryProfileToUser(fakeADProfile);

      return expectSaga(signInFlow)
        .provide([
          [call(isAuthenticated), true],
          [call(getSignedInADProfile), fakeADProfile],
        ])
        .call(isAuthenticated)
        .put(actionCreators.loginSuccess(fakeUser))
        .run();
    });

    it('performs remote auth request if auth not cached', () => {
      let shouldBeAuthenticated = false;

      return expectSaga(signInFlow)
        .provide({
          call(effect, next) {
            if (effect.fn === isAuthenticated) {
              return shouldBeAuthenticated;
            } else if (effect.fn === getSignedInADProfile) {
              return fakeADProfile;
            } else if (effect.fn === login) {
              // Cancel the call to the API login function to avoid Adal.js
              // When remote login is attempted, assume it is successful
              shouldBeAuthenticated = true;
              return null;
            } else if (effect.fn === delay) {
              // We also cancel the `delay()` effect to avoid a test timeout
              return null;
            }

            return next();
          },
        })
        .call(login)
        .put(
          actionCreators.loginSuccess(
            activeDirectoryProfileToUser(fakeADProfile)
          )
        )
        .run();
    });
  });

  describe('sign out flow', () => {
    it('succeeds logging out', () => {
      return (
        expectSaga(signOutFlow)
          // Cancel the delay effect to avoid timing out the Saga
          // Cancel the call to the API logout function to avoid Adal.js
          .provide([[matchers.call.fn(delay)], [call(logout)]])
          .call(logout)
          .put(actionCreators.logoutSuccess())
          .run()
      );
    });
  });
});
