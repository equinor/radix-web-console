import { subscribe, unsubscribe } from './action-creators';
import reducer from './reducer';

describe('streaming reducer', () => {
  const initialState = Object.freeze({});

  it('initialises subscriber count as 1', () => {
    const resource = '/a/resource/path';
    const newState = reducer(initialState, subscribe(resource));

    expect(newState[resource].subscriberCount).toEqual(1);
  });

  it('increments subscriber count with repeat subscriptions', () => {
    const resource = '/a/resource/path';
    let newState;

    newState = reducer(initialState, subscribe(resource));
    newState = reducer(newState, subscribe(resource));
    newState = reducer(newState, subscribe(resource));

    expect(newState[resource].subscriberCount).toEqual(3);
  });

  it('decrements subscriber count on unsubscription', () => {
    const resource = '/a/resource/path';
    let newState;

    newState = reducer(initialState, subscribe(resource));
    newState = reducer(newState, subscribe(resource));
    newState = reducer(newState, subscribe(resource));

    newState = reducer(newState, unsubscribe(resource));
    newState = reducer(newState, unsubscribe(resource));

    expect(newState[resource].subscriberCount).toEqual(1);
  });

  it('removes resource when subscriber count is zero', () => {
    const resource = '/a/resource/path';
    let newState;

    newState = reducer(initialState, subscribe(resource));
    newState = reducer(newState, unsubscribe(resource));

    expect(newState[resource]).toBeUndefined();
  });
});
