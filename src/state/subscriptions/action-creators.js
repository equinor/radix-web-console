import actionTypes from './action-types';

export const subscribe = resource => ({
  resource,
  type: actionTypes.SUBSCRIBE,
});

export const unsubscribe = resource => ({
  resource,
  type: actionTypes.UNSUBSCRIBE,
});
