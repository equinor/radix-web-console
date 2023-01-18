import { restartActions } from '../restart-base/action-creators';
import { startActions } from '../start-base/action-creators';
import { stopActions } from '../stop-base/action-creators';

export const actions = {
  start: startActions<
    never,
    { appName: string; envName: string; componentName: string },
    [appName: string, envName: string, componentName: string]
  >('COMPONENT', 'appName', 'envName', 'componentName'),
  stop: stopActions<
    never,
    { appName: string; envName: string; componentName: string },
    [appName: string, envName: string, componentName: string]
  >('COMPONENT', 'appName', 'envName', 'componentName'),
  restart: restartActions<
    never,
    { appName: string; envName: string; componentName: string },
    [appName: string, envName: string, componentName: string]
  >('COMPONENT', 'appName', 'envName', 'componentName'),
};
