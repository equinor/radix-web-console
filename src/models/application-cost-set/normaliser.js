import pick from 'lodash/pick';

import model from '.';

/**
 * Create an Application Cost set object
 */
export const normaliser = (props) => {
  let costSet = Object.freeze(pick(props, Object.keys(model)));
  return costSet;
};

export default normaliser;
