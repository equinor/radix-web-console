import { restartActions } from '../restart-utils/action-creators';
import { startActions } from '../start-utils/action-creators';
import { stopActions } from '../stop-utils/action-creators';

export const actions = {
  start: startActions('COMPONENT', 'appName', 'envName', 'componentName'),
  stop: stopActions('COMPONENT', 'appName', 'envName', 'componentName'),
  restart: restartActions('COMPONENT', 'appName', 'envName', 'componentName'),
};

export default actions;
