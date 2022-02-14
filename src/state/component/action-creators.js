import { restartActions } from '../restart-base/action-creators';
import { startActions } from '../start-base/action-creators';
import { stopActions } from '../stop-base/action-creators';

export const actions = {
  start: startActions('COMPONENT', 'appName', 'envName', 'componentName'),
  stop: stopActions('COMPONENT', 'appName', 'envName', 'componentName'),
  restart: restartActions('COMPONENT', 'appName', 'envName', 'componentName'),
};

export default actions;
