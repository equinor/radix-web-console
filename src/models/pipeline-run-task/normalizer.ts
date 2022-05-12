import { PipelineRunTaskModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { isNaN } from 'lodash';

/**
 * Create a PipelineRunTaskModel object
 */
export const PipelineRunTaskModelNormalizer: ModelNormalizerType<
  PipelineRunTaskModel
> = (props) => {
  const normalized = { ...(props as PipelineRunTaskModel) };

  const started = new Date(normalized.started);
  const ended = new Date(normalized.ended);

  normalized.started = isNaN(started?.valueOf()) ? undefined : started;
  normalized.ended = isNaN(ended?.valueOf()) ? undefined : ended;
  // normalized.steps =
  //   normalized.steps?.map(PipelineTaskStepModelNormalizer);

  return Object.freeze(normalized);
};
