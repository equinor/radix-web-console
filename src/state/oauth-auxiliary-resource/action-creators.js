import { restartActions } from '../restart-utils/action-creators';

export const actions = {
  restart: restartActions(
    'OAUTH_AUXILIARY_RESOURCE',
    'appName',
    'envName',
    'componentName'
  ),
};

export default actions;
