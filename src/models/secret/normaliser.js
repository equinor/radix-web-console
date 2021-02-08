import pick from 'lodash/pick';

import model from '.';

/**
 * Create a Secret object
 */
export const normaliser = (props) =>
  Object.freeze(pick(props, Object.keys(model)));

export default normaliser;
