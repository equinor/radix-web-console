import pick from 'lodash/pick';
import model from '.';

/**
 * Create an ApplicationCostModel object
 */
export const normaliser = (props) =>
  Object.freeze(pick(props, Object.keys(model)));

export default normaliser;
