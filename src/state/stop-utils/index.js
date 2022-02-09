import { makeLocalGetter } from '../../utils/object';
import requestStates from '../state-utils/request-states';

export const stopState = (stateRootKey) => {
  const localGetter = makeLocalGetter(stateRootKey);
  const requestStatusGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'status'], requestStates.IDLE);
  const requestErrorGetter = (state, requestKey) =>
    localGetter(state, [requestKey, 'lastError'], requestStates.IDLE);

  return {
    getStopRequestStatus: (state) => requestStatusGetter(state, 'stopRequest'),

    getStopRequestError: (state) => requestErrorGetter(state, 'stopRequest'),
  };
};
