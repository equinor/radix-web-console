import { makeRequestReducer } from '../state-utils/request';
import { RequestState } from '../state-utils/request-states';
import { RootState } from '../../init/store';

export const isRefreshing = (state: RootState): boolean =>
  state.subscriptionRefresh.status === RequestState.IN_PROGRESS;

export default makeRequestReducer<never>('SUBSCRIPTIONS_REFRESH');
