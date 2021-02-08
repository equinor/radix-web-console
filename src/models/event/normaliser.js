import pick from 'lodash/pick';
import model from '.';

/**
 * Create a Event object
 */

export const normaliser = (props) => {
  const dt = new Date(props.lastTimestamp);
  props.lastTimestamp = isNaN(dt) ? undefined : dt;
  let event = Object.freeze(pick(props, Object.keys(model)));
  return event;
};

export default normaliser;
