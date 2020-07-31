import pick from 'lodash/pick';

import model from '.';

/**
 * Create an Application Cost set object
 */
export default (props) => {
  let costSet = Object.freeze(pick(props, Object.keys(model)));
  return costSet;
};
