import { makeStore } from '../../init/store';
import * as getters from './index';
import * as actionCreators from './action-creators';
import statusTypes from './status-types';

describe('auth reducer', () => {
  let store;

  beforeEach(() => (store = makeStore(false)));

  describe('Login', () => {
    it('starts by being logged out', () => {
      const state = store.getState();
      expect(getters.getAuthStatus(state)).toBe(statusTypes.NOT_AUTHENTICATED);
    });

    it('becomes in progress when requesting login', () => {
      store.dispatch(actionCreators.loginRequest());
      const state = store.getState();

      expect(getters.getAuthStatus(state)).toBe(statusTypes.AUTHENTICATING);
    });

    it('increments when committing update', () => {
      const user = { name: 'Bob', dummy: true };

      store.dispatch(actionCreators.loginSuccess(user));
      const state = store.getState();

      expect(getters.getAuthStatus(state)).toBe(statusTypes.AUTHENTICATED);
      expect(getters.getUser(state)).toEqual(user);
    });
  });
});
