import { RequestState } from '../state-utils/request-states';
import { makeLocalGetter } from '../../utils/object';

export const restartState = (stateRootKey) => {
  const localGetter = makeLocalGetter(stateRootKey);
  const requestStatusGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'status'], RequestState.IDLE);
  const requestErrorGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'lastError'], RequestState.IDLE);

  return {
    getRestartRequestStatus: (state) =>
      requestStatusGetter(state, 'restartRequest'),

    getRestartRequestError: (state) =>
      requestErrorGetter(state, 'restartRequest'),
  };
};
