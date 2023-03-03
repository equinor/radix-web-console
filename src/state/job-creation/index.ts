import { RootState } from '../../init/store';
import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter<RootState>('jobCreation');

export const getCreationState = (
  state: RootState
): RootState['jobCreation']['status'] => localGetter(state, 'status');
export const getCreationResult = (
  state: RootState
): RootState['jobCreation']['payload'] => localGetter(state, 'payload');
export const getCreationError = (
  state: RootState
): RootState['jobCreation']['lastError'] => localGetter(state, 'lastError');
