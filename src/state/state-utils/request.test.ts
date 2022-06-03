import type { ActionType } from './action-creators';
import { makeRequestReducer, RequestReducerState } from './request';
import { RequestState } from './request-states';

describe('generate request reducer', () => {
  let prefix: string;
  let action: ActionType;
  let reducer: (
    state: RequestReducerState,
    action: ActionType
  ) => RequestReducerState;

  beforeEach(() => {
    prefix = 'A_PREFIX';
    action = { meta: {} } as ActionType;
    reducer = makeRequestReducer<never>(prefix);
  });

  it('returns default state', () => {
    action.type = 'dummy';
    expect(reducer(undefined, action)).toEqual({
      status: RequestState.IDLE,
      payload: null,
      lastError: '',
    });
  });

  it('sets state to in progress', () => {
    action.type = `${prefix}_REQUEST`;
    expect(reducer(undefined, action)).toMatchObject({
      status: RequestState.IN_PROGRESS,
    });
  });

  it('sets state to complete', () => {
    action.type = `${prefix}_COMPLETE`;
    expect(reducer(undefined, action)).toMatchObject({
      status: RequestState.SUCCESS,
    });
  });
});
