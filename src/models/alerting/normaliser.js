import pick from 'lodash/pick';

import { AlertingConfigModel } from '.';

/**
 * Create an AlertingConfigProps object
 */
export const normaliser = (props) =>
  Object.freeze(pick(props, Object.keys(AlertingConfigModel)));

export default normaliser;
