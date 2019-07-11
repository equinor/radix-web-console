import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export const addApplications = makeActionCreator(
  actionTypes.APPS_SNAPSHOT,
  'apps'
);
