import get from 'lodash/get';

export const getJobs = state => get(state, 'jobs', []);
