import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('secrets');

export const getSaveState = state => localGetter(state, 'save.status');
export const getSaveError = state => localGetter(state, 'save.lastError');
export const getSecrets = state => localGetter(state, 'clusterSecrets');
