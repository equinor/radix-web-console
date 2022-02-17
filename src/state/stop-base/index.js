import { RequestState } from '../state-utils/request-states';
import { makeLocalGetter } from '../../utils/object';

export const stopState = (stateRootKey) => {
  const localGetter = makeLocalGetter(stateRootKey);
  const requestStatusGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'status'], RequestState.IDLE);
  const requestErrorGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'lastError'], RequestState.IDLE);

  return {
    getStopRequestStatus: (state) => requestStatusGetter(state, 'stopRequest'),

    getStopRequestError: (state) => requestErrorGetter(state, 'stopRequest'),
  };
};
