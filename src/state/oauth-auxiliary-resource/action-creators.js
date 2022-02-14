import { restartActions } from '../restart-base/action-creators';

export const actions = {
  restart: restartActions(
    'OAUTH_AUXILIARY_RESOURCE',
    'appName',
    'envName',
    'componentName'
  ),
};

export default actions;
