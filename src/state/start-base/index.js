import { makeLocalGetter } from '../../utils/object';
import requestStates from '../state-utils/request-states';

export const startState = (stateRootKey) => {
  const localGetter = makeLocalGetter(stateRootKey);
  const requestStatusGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'status'], requestStates.IDLE);
  const requestErrorGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'lastError'], requestStates.IDLE);

  return {
    getStartRequestStatus: (state) =>
      requestStatusGetter(state, 'startRequest'),

    getStartRequestError: (state) => requestErrorGetter(state, 'startRequest'),
  };
};
