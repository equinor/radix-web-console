import get from 'lodash/get';

export const getDeployments = (state) => get(state, 'deployments', []);
