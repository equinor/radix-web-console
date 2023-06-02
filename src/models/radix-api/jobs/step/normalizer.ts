import { StepModel } from './index';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, filterUndefinedFields } from '../../../model-utils';

/**
 * Create a StepModel object
 */
export const StepModelNormalizer: ModelNormalizerType<StepModel> = (props) => {
  const step = { ...(props as StepModel) };

  step.started = dateNormalizer(step.started);
  step.ended = dateNormalizer(step.ended);

  return Object.freeze(filterUndefinedFields(step));
};
