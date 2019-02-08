import { makeLocalGetter } from '../../utils/object';
import requestStates from '../state-utils/request-states';

const localGetter = makeLocalGetter('secrets');

export const getSaveState = (state, secretName) =>
  localGetter(state, [secretName, 'status'], requestStates.IDLE);

export const getSaveError = (state, secretName) =>
  localGetter(state, [secretName, 'error']);
