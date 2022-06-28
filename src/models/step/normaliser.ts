import { ScanModelNormalizer } from '../scan/normalizer';
import { ModelNormalizerType } from '../model-types';
import { StepModel } from './index';
import { dateNormalizer } from '../model-utils';

/**
 * Create a StepModel object
 */
export const StepModelNormalizer: ModelNormalizerType<StepModel> = (props) => {
  const step = { ...(props as StepModel) };

  step.started = dateNormalizer(step.started);
  step.ended = dateNormalizer(step.ended);
  step.scan = step.scan && ScanModelNormalizer(step.scan);

  return Object.freeze(step);
};
