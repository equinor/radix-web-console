import { makeStore } from '../../bootstrap/store';
import * as getters from './index';
import * as actionCreators from './action-creators';

describe('Counters', () => {
  let store;

  beforeEach(() => (store = makeStore()));

  describe('Sync counter', () => {
    it('starts at 0', () => {
      expect(getters.getSyncCounter(store.getState())).toBe(0);
    });

    it('increments correctly', () => {
      store.dispatch(actionCreators.incrementSyncCounter());
      expect(getters.getSyncCounter(store.getState())).toBe(1);
    });
  });

  describe('Async counter', () => {
    it('starts at 0', () => {
      expect(getters.getAsyncCounter(store.getState())).toBe(0);
    });

    it('does not increment when starting update', () => {
      store.dispatch(actionCreators.startIncrementAsyncCounter());
      const state = store.getState();

      expect(getters.getAsyncCounter(state)).toBe(0);
      expect(getters.isUpdatingAsync(state)).toBe(true);
    });

    it('increments when committing update', () => {
      store.dispatch(actionCreators.commitIncrementAsyncCounter(10));
      const state = store.getState();

      expect(getters.getAsyncCounter(state)).toBe(10);
      expect(getters.isUpdatingAsync(state)).toBe(false);
    });
  });
});
