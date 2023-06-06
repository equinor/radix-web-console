import { PipelineRunTaskModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, filterUndefinedFields } from '../../../model-utils';

/**
 * Create a PipelineRunTaskModel object
 */
export const PipelineRunTaskModelNormalizer: ModelNormalizerType<
  PipelineRunTaskModel
> = (props) => {
  const normalized = { ...(props as PipelineRunTaskModel) };

  normalized.started = dateNormalizer(normalized.started);
  normalized.ended = dateNormalizer(normalized.ended);

  return Object.freeze(filterUndefinedFields(normalized));
};
