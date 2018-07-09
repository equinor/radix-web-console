import { makeStore } from '../../init/store';
import * as getters from './index';
import * as actionCreators from './action-creators';

describe('applications reducer', () => {
  let store;

  beforeEach(() => (store = makeStore()));

  describe('APPS_LIST_ADD', () => {
    it('state starts with no apps', () => {
      const state = store.getState();
      expect(getters.getApplicationList(state).length).toEqual(0);
    });

    it('app is stored in state after calling addAppToList', () => {
      const testapp = {
        metadata: { name: 'testapp' },
        kind: 'RadixApplication',
      };
      store.dispatch(actionCreators.default.addAppToList(testapp));
      const state = store.getState();
      expect(getters.getApplicationList(state).length).toEqual(1);
      expect(getters.getApplicationList(state)[0].metadata.name).toEqual(
        testapp.metadata.name
      );
    });

    it('should not add duplicate apps', () => {
      const testapp = {
        metadata: { name: 'testapp' },
        kind: 'RadixApplication',
      };
      store.dispatch(actionCreators.default.addAppToList(testapp));
      store.dispatch(actionCreators.default.addAppToList(testapp));
      const state = store.getState();
      expect(getters.getApplicationList(state).length).toEqual(1);
    });
  });

  describe('APPS_LIST_REMOVE', () => {
    it('should be empty after adding then deleting an app', () => {
      const testapp = {
        metadata: { name: 'testapp' },
        kind: 'RadixApplication',
      };
      store.dispatch(actionCreators.default.addAppToList(testapp));
      store.dispatch(actionCreators.default.deleteAppFromList(testapp));
      const state = store.getState();
      expect(getters.getApplicationList(state).length).toEqual(0);
    });
  });

  describe('APPS_DELETE_REQUEST', () => {
    it('app should have deleting=true after request', () => {
      const testapp = {
        metadata: { name: 'testapp' },
        kind: 'RadixApplication',
      };
      store.dispatch(actionCreators.default.addAppToList(testapp));
      store.dispatch(
        actionCreators.default.deleteAppRequest(testapp.metadata.name)
      );
      const state = store.getState();
      expect(getters.getApplicationList(state)[0].deleting).toBe(true);
    });
  });

  // TODO: the reducer seems inconsistent with id/name use
  describe('APPS_DELETE_CONFIRM', () => {
    it('app should be gone after delete is confirmed', () => {
      const testapp = {
        metadata: { name: 'testapp' },
        kind: 'RadixApplication',
      };
      store.dispatch(actionCreators.default.addAppToList(testapp));
      store.dispatch(actionCreators.default.deleteAppConfirm(testapp));
      const state = store.getState();
    });
  });

  // TODO: the reducer seems inconsistent with id/name use
  describe('APPS_SET_BUILD_STATUS', () => {});
});
