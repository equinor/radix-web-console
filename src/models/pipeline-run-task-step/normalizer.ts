import { PipelineRunTaskStepModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { isNaN } from 'lodash';

/**
 * Create a PipelineRunTaskStepModel object
 */
export const PipelineRunTaskStepModelNormalizer: ModelNormalizerType<
  PipelineRunTaskStepModel
> = (props) => {
  const normalized = { ...(props as PipelineRunTaskStepModel) };

  const started = new Date(normalized.started);
  const ended = new Date(normalized.ended);

  normalized.started = isNaN(started?.valueOf()) ? undefined : started;
  normalized.ended = isNaN(ended?.valueOf()) ? undefined : ended;

  return Object.freeze(normalized);
};
