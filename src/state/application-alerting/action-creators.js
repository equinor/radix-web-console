import { alertingActions } from '../alerting-utils/action-creators';

export const actions = alertingActions('APPLICATION_ALERTING', 'appName');

export default actions;
