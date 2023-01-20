import { RequestState } from '../state-utils/request-states';
import { RootState } from '../../init/store';
import { makeLocalGetter } from '../../utils/object';

export const restartState = (stateRootKey: keyof RootState) => {
  const localGetter = makeLocalGetter<RootState>([stateRootKey as string]);

  const requestStatusGetter = (state: RootState, requestKey: string) =>
    localGetter<RequestState>(state, [requestKey, 'status'], RequestState.IDLE);
  const requestErrorGetter = (state: RootState, requestKey: string) =>
    localGetter<string>(state, [requestKey, 'lastError'], '');

  return {
    getRestartRequestStatus: (state: RootState): RequestState =>
      requestStatusGetter(state, 'restartRequest'),

    getRestartRequestError: (state: RootState): string =>
      requestErrorGetter(state, 'restartRequest'),
  };
};
