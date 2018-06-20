import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('counters');

export const getSyncCounter = state => localGetter(state, 'syncCounter');
export const getAsyncCounter = state => localGetter(state, 'asyncCounter');
export const isUpdatingAsync = state => localGetter(state, 'updatingAsync');
