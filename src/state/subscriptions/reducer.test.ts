import { reducer, SubscriptionsStateType } from '.';
import {
  subscribe,
  subscriptionFailed,
  subscriptionLoaded,
  unsubscribe,
  subscriptionEnded,
} from './action-creators';

import { subscriptionsRefreshRequest } from '../subscription-refresh/action-creators';

describe('streaming reducer', () => {
  const initialState: Readonly<SubscriptionsStateType> = Object.freeze({});

  it('initialises subscriber count as 1', () => {
    const resource = '/a/resource/path';
    const newState = reducer(initialState, subscribe(resource));

    expect(newState[resource].subscriberCount).toEqual(1);
  });

  it('increments subscriber count with repeat subscriptions', () => {
    const resource = '/a/resource/path';

    let newState: SubscriptionsStateType;
    newState = reducer(initialState, subscribe(resource));
    newState = reducer(newState, subscribe(resource));
    newState = reducer(newState, subscribe(resource));

    expect(newState[resource].subscriberCount).toEqual(3);
  });

  it('decrements subscriber count on unsubscription', () => {
    const resource = '/a/resource/path';

    let newState: SubscriptionsStateType;
    newState = reducer(initialState, subscribe(resource));
    newState = reducer(newState, subscribe(resource));
    newState = reducer(newState, subscribe(resource));

    newState = reducer(newState, unsubscribe(resource));
    newState = reducer(newState, unsubscribe(resource));

    expect(newState[resource].subscriberCount).toEqual(1);
  });

  it('removes resource when subscription has ended', () => {
    const resource = '/a/resource/path';
    const resourceName = 'test_resource';

    let newState: SubscriptionsStateType;
    newState = reducer(initialState, subscribe(resource));
    newState = reducer(newState, unsubscribe(resource));
    newState = reducer(newState, subscriptionEnded(resource, resourceName));

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

    let newState: SubscriptionsStateType;
    newState = resources.reduce((obj, resource) => {
      return reducer(obj, subscribe(resource));
    }, initialState);
    newState = reducer(newState, subscriptionsRefreshRequest());

    expect(!Object.keys(newState).find((x) => !newState[x].isLoading)).toBe(
      true
    );
  });

  it('marks resource as failed on error', () => {
    const resource = '/a/resource/path';

    let newState: SubscriptionsStateType;
    newState = reducer(initialState, subscribe(resource));
    newState = reducer(newState, subscriptionFailed(resource, 'boom'));

    expect(newState[resource].error).toEqual('boom');
  });

  it('clears resource error on subsequent success', () => {
    const resource = '/a/resource/path';

    let newState: SubscriptionsStateType;
    newState = reducer(initialState, subscribe(resource));
    newState = reducer(newState, subscriptionFailed(resource, 'boom'));
    newState = reducer(newState, subscriptionLoaded(resource));

    expect(newState[resource].error).toBeNull();
  });
});
