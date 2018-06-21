import values from 'lodash/values';
export const STATE_KEY = 'applications';

export const getApplications = state => state[STATE_KEY].apps;

export const getApplicationList = state => values(getApplications(state));

export const isCreating = state => state[STATE_KEY].creating;
