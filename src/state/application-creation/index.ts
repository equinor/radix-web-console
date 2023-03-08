import { RootState } from '../../init/store';
import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter<RootState>('applicationCreation');

export const getCreationState = (
  state: RootState
): RootState['applicationCreation']['status'] => localGetter(state, 'status');
export const getCreationResult = (
  state: RootState
): RootState['applicationCreation']['payload'] => localGetter(state, 'payload');
export const getCreationError = (
  state: RootState
): RootState['applicationCreation']['lastError'] =>
  localGetter(state, 'lastError');
