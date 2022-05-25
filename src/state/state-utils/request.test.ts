import {
  makeRequestReducer,
  ReducerActionType,
  ReducerStateType,
} from './request';
import { RequestState } from './request-states';

describe('generate request reducer', () => {
  let prefix: string;
  let action: ReducerActionType;
  let reducer: (
    state: ReducerStateType<undefined>,
    action: ReducerActionType
  ) => ReducerStateType<undefined>;

  beforeEach(() => {
    prefix = 'A_PREFIX';
    reducer = makeRequestReducer<undefined>(prefix);
    action = {
      type: null,
      error: null,
      messageType: null,
      resource: null,
    };
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
