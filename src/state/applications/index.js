import get from 'lodash/get';

export const getApplications = (state) => get(state, 'applications');
