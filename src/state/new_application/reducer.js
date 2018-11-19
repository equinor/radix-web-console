import actionTypes from './action-types';

import { Application } from '../../models/factories';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.APP_SNAPSHOT:
      return Application(action.payload);

    default:
      return state;
  }
};
