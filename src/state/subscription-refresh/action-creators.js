import actionTypes from './action-types';
import { makeActionCreator } from '../state-utils/action-creators';

export const subscriptionsRefreshRequest = makeActionCreator(
  actionTypes.SUBSCRIPTIONS_REFRESH_REQUEST
);

export const subscriptionsRefreshComplete = makeActionCreator(
  actionTypes.SUBSCRIPTIONS_REFRESH_COMPLETE
);
