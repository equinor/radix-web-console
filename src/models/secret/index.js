import pick from 'lodash/pick';

import model from './model';

/**
 * Create a Secret object
 */
export default props =>
  Object.freeze(pick(props, Object.keys(model.Application)));
