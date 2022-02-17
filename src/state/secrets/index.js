import { RequestState } from '../state-utils/request-states';
import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('secrets');

export const getSaveState = (state, secretName) =>
  localGetter(state, [secretName, 'status'], RequestState.IDLE);

export const getSaveError = (state, secretName) =>
  localGetter(state, [secretName, 'error']);
