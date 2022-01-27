import pick from 'lodash/pick';
import model from '.';

/**
 * Create a ApplicationCost object
 */

export const normaliser = (props) => {
  let cost = Object.freeze(pick(props, Object.keys(model)));
  return cost;
};

export default normaliser;
