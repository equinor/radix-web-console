import { restartActions } from '../restart-base/action-creators';
import { startActions } from '../start-base/action-creators';
import { stopActions } from '../stop-base/action-creators';

export const actions = {
  start: startActions<
    string,
    { appName: string; envName: string; componentName: string },
    [appName: string, envName: string, componentName: string]
  >('COMPONENT', 'appName', 'envName', 'componentName'),
  stop: stopActions<
    string,
    { appName: string; envName: string; componentName: string },
    [appName: string, envName: string, componentName: string]
  >('COMPONENT', 'appName', 'envName', 'componentName'),
  restart: restartActions<
    string,
    { appName: string; envName: string; componentName: string },
    [appName: string, envName: string, componentName: string]
  >('COMPONENT', 'appName', 'envName', 'componentName'),
};