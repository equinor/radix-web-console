import { ScanModelNormalizer } from '../scan/normalizer';
import { ModelNormalizerType } from '../model-types';
import { StepModel } from './index';

/**
 * Create a Step object
 */
export const StepModelNormalizer: ModelNormalizerType<StepModel> = (props) => {
  const step = { ...(props as StepModel) };

  step.started = step.started ? new Date(step.started) : null;
  step.ended = step.ended ? new Date(step.ended) : null;
  step.scan = step.scan ? ScanModelNormalizer(step.scan) : null;
  return Object.freeze(step);
};
