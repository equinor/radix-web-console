import { alertingActions } from '../alerting-utils/action-creators';

export const actions = alertingActions(
  'ENVIRONMENT_ALERTING',
  'appName',
  'envName'
);

export default actions;
