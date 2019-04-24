import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { subscribe } from '../../api/resources';
import { subscribeFlow } from './sagas';
import * as actionCreators from './action-creators';

describe('subscription flow', () => {
  it('marks subscription as successful', () => {
    const resource = '/applications/test';
    const action = actionCreators.subscribe(resource);

    return expectSaga(subscribeFlow, action)
      .withState({
        subscriptions: {
          [resource]: { subscriberCount: 1, messageType: 'json' },
        },
      })
      .provide([[matchers.call.fn(subscribe), { some: 'json' }]])
      .put(actionCreators.subscriptionLoading(resource))
      .put(actionCreators.subscriptionLoaded(resource))
      .run();
  });

  it('does nothing if more than one subscriber', () => {
    const resource = '/applications/test';
    const action = actionCreators.subscribe(resource);

    return expectSaga(subscribeFlow, action)
      .withState({
        subscriptions: {
          [resource]: { subscriberCount: 2, messageType: 'json' },
        },
      })
      .provide([[matchers.call.fn(subscribe), { some: 'json' }]])
      .run()
      .then(({ effects }) => {
        // see https://github.com/jfairbank/redux-saga-test-plan/blob/master/docs/integration-testing/exposed-effects.md
        expect(effects.call).toBeUndefined();
        expect(effects.put).toBeUndefined();
      });
  });

  it('stores subscription error on failure', () => {
    const resource = '/applications/test';
    const error = 'some error';
    const action = actionCreators.subscribe(resource);

    return expectSaga(subscribeFlow, action)
      .withState({
        subscriptions: {
          [resource]: { subscriberCount: 1, messageType: 'json' },
        },
      })
      .provide([[matchers.call.fn(subscribe), throwError(error)]])
      .put(actionCreators.subscriptionLoading(resource))
      .put(actionCreators.subscriptionFailed(resource, error))
      .run();
  });
});
