import pick from 'lodash/pick';

import model from '.';

/**
 * Create a Port object
 */
export const normaliser = (props) =>
  Object.freeze(pick(props, Object.keys(model)));

export default normaliser;
