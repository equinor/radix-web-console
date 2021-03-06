import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('jobCreation');

export const getCreationState = (state) =>
  localGetter(state, 'creation.status');
export const getCreationResult = (state) =>
  localGetter(state, 'creation.payload');
export const getCreationError = (state) =>
  localGetter(state, 'creation.lastError');
