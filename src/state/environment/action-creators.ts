import { restartActions } from '../restart-base/action-creators';
import { startActions } from '../start-base/action-creators';
import { stopActions } from '../stop-base/action-creators';

export const actions = {
  start: startActions<
    string,
    { appName: string; envName: string },
    [appName: string, envName: string]
  >('ENVIRONMENT', 'appName', 'envName'),
  stop: stopActions<
    string,
    { appName: string; envName: string },
    [appName: string, envName: string]
  >('ENVIRONMENT', 'appName', 'envName'),
  restart: restartActions<
    string,
    { appName: string; envName: string },
    [appName: string, envName: string]
  >('ENVIRONMENT', 'appName', 'envName'),
};
