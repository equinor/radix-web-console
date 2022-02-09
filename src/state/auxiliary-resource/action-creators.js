import { restartActions } from '../restart-utils/action-creators';

export const actions = {
  ...restartActions(
    'AUXILIARY_RESOURCE',
    'appName',
    'envName',
    'componentName',
    'auxType'
  ),
};

export default actions;
