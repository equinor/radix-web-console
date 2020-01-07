import {
  subscribe,
  subscriptionFailed,
  subscriptionLoaded,
  unsubscribe,
  subscriptionEnded,
} from './action-creators';
import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';
import reducer from './reducer';

describe('streaming reducer', () => {
  const initialState = Object.freeze({ status: {}, streams: {} });

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

  it('removes resource when subscription has ended', () => {
    const resource = '/a/resource/path';
    let newState;

    newState = reducer(initialState, subscribe(resource));
    newState = reducer(newState, unsubscribe(resource));
    newState = reducer(newState, subscriptionEnded(resource));

    expect(newState[resource]).toBeUndefined();
  });

  it('marks all resources as loading when refreshing', () => {
    const resources = [
      '/a/resource/path1',
      '/a/resource/path2',
      '/a/resource/path3',
      '/a/resource/path4',
      '/a/resource/path5',
    ];

    let newState = resources.reduce(
      (prevState, res) => reducer(prevState, subscribe(res)),
      initialState
    );

    newState = reducer(newState, subscriptionsRefreshRequest());
    const allLoading = Object.values(newState).every(res => res.isLoading);

    expect(allLoading).toBe(true);
  });

  it('marks resource as failed on error', () => {
    const resource = '/a/resource/path';
    let newState = reducer(initialState, subscribe(resource));

    newState = reducer(newState, subscriptionFailed(resource, 'boom'));
    expect(newState[resource].error).toEqual('boom');
  });

  it('clears resource error on subsequent success', () => {
    const resource = '/a/resource/path';
    let newState = reducer(initialState, subscribe(resource));

    newState = reducer(newState, subscriptionFailed(resource, 'boom'));
    newState = reducer(newState, subscriptionLoaded(resource));
    expect(newState[resource].error).toBeUndefined();
  });
});
