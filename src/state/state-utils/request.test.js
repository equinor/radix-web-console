import { makeRequestReducer } from './request';
import requestStates from './request-states';

describe('generate request reducer', () => {
  let prefix;
  let reducer;

  beforeEach(() => {
    prefix = 'A_PREFIX';
    reducer = makeRequestReducer(prefix);
  });

  it('returns default state', () => {
    const action = { type: 'dummy' };
    expect(reducer(undefined, action)).toEqual({
      status: requestStates.IDLE,
      payload: null,
      lastError: '',
    });
  });

  it('sets state to in progress', () => {
    const action = { type: `${prefix}_REQUEST` };
    expect(reducer(undefined, action)).toMatchObject({
      status: requestStates.IN_PROGRESS,
    });
  });

  it('sets state to complete', () => {
    const action = { type: `${prefix}_COMPLETE` };
    expect(reducer(undefined, action)).toMatchObject({
      status: requestStates.SUCCESS,
    });
  });
});
