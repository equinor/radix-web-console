import pick from 'lodash/pick';

import model from '.';

/**
 * Create an Application Cost object
 */
export default (props) => {
  let cost = Object.freeze(pick(props, Object.keys(model)));
  return cost;
};
