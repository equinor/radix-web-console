import get from 'lodash/get';

export const getLastKnownApplicationNames = (state) => {
  return get(state, 'lastKnownApplications');
};
