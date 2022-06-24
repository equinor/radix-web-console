import { PipelineRunModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { dateNormalizer } from '../model-utils';

/**
 * Create a PipelineRunModel object
 */
export const PipelineRunModelNormalizer: ModelNormalizerType<
  PipelineRunModel
> = (props) => {
  const normalized = { ...(props as PipelineRunModel) };

  normalized.started = dateNormalizer(normalized.started);
  normalized.ended = dateNormalizer(normalized.ended);

  return Object.freeze(normalized);
};
