import { restartActions } from '../restart-utils/action-creators';

export const actions = {
  restart: restartActions(
    'AUXILIARY_RESOURCE',
    'appName',
    'envName',
    'componentName',
    'auxType'
  ),
};

export default actions;
