import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('applications');

export const getCreationState = state => localGetter(state, 'creation.status');
export const getCreationError = state =>
  localGetter(state, 'creation.lastError');
export const getApplications = state => localGetter(state, 'apps');
export const getApplicationList = state =>
  Object.values(getApplications(state));
