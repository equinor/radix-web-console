import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('secrets');

export const getSaveState = (state, secretName) =>
  localGetter(state, [secretName, 'status']);

export const getSaveError = (state, secretName) =>
  localGetter(state, [secretName, 'error']);
