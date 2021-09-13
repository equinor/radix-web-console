import get from 'lodash/get';

export const getFavouriteApplications = (state) => {
  return get(state, 'favouriteApplications');
};
