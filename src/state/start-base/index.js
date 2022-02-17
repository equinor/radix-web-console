import { RequestState } from '../state-utils/request-states';
import { makeLocalGetter } from '../../utils/object';

export const startState = (stateRootKey) => {
  const localGetter = makeLocalGetter(stateRootKey);
  const requestStatusGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'status'], RequestState.IDLE);
  const requestErrorGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'lastError'], RequestState.IDLE);

  return {
    getStartRequestStatus: (state) =>
      requestStatusGetter(state, 'startRequest'),

    getStartRequestError: (state) => requestErrorGetter(state, 'startRequest'),
  };
};
