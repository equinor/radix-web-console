import statusTypes from './status-types';
import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('auth');

export const getUser = state => localGetter(state, 'user');
export const getAuthStatus = state => localGetter(state, 'status');
export const isLoggedIn = state =>
  localGetter(state, 'status') === statusTypes.AUTHENTICATED;
