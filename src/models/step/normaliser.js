import pick from 'lodash/pick';

import model from '.';

/**
 * Create a Step object
 */
export const normaliser = (props) => {
  const step = pick(props, Object.keys(model));

  step.started = step.started ? new Date(step.started) : null;
  step.ended = step.ended ? new Date(step.ended) : null;

  return Object.freeze(step);
};

export default normaliser;
