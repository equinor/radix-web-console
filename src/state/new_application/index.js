import { makeLocalGetter } from '../../utils/object';

const localGetter = makeLocalGetter('application');

export const getJobs = state => localGetter(state, 'jobs');
