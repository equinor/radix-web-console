import { PipelineRunTaskStepModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, filterUndefinedFields } from '../../../model-utils';

/**
 * Create a PipelineRunTaskStepModel object
 */
export const PipelineRunTaskStepModelNormalizer: ModelNormalizerType<
  PipelineRunTaskStepModel
> = (props) => {
  const normalized = { ...(props as PipelineRunTaskStepModel) };

  normalized.started = dateNormalizer(normalized.started);
  normalized.ended = dateNormalizer(normalized.ended);

  return Object.freeze(filterUndefinedFields(normalized));
};
