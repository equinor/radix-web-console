import pick from 'lodash/pick';

import model from '.';
import { ScanModelNormalizer } from '../scan/normalizer';

/**
 * Create a Step object
 */
export const normaliser = (props) => {
  const step = pick(props, Object.keys(model));

  step.started = step.started ? new Date(step.started) : null;
  step.ended = step.ended ? new Date(step.ended) : null;
  step.scan = step.scan ? ScanModelNormalizer(step.scan) : null;
  return Object.freeze(step);
};

export default normaliser;
