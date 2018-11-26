import { makeActionCreator } from '../state-utils/action-creators';

import actionTypes from './action-types';

export const addApplications = makeActionCreator(
  actionTypes.JOB_LOGS_SNAPSHOT,
  'jobLogs'
);
