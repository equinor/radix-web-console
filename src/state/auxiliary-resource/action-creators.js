import { restartActions } from '../restart-utils/action-creators';

export const actions = {
  ...restartActions(
    'AUX_RESOURCE',
    'appName',
    'envName',
    'componentName',
    'auxType'
  ),
};

export default actions;
