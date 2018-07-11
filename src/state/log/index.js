import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('log');

export const getLog = state => localGetter(state, 'log');
export const getUpdatingLog = state => localGetter(state, 'updatingLog');
