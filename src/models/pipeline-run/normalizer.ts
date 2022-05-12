import { PipelineRunModel } from '.';
import { ModelNormalizerType } from '../model-types';
import { PipelineRunTaskModelNormalizer } from '../pipeline-run-task/normalizer';
import { isNaN } from 'lodash';

/**
 * Create a PipelineRunModel object
 */
export const PipelineRunModelNormalizer: ModelNormalizerType<
  PipelineRunModel
> = (props) => {
  const normalized = { ...(props as PipelineRunModel) };

  const ended = new Date(normalized.ended);
  const started = new Date(normalized.started);

  normalized.started = isNaN(started?.valueOf()) ? undefined : started;
  normalized.ended = isNaN(ended?.valueOf()) ? undefined : ended;
  normalized.tasks = normalized.tasks?.map(PipelineRunTaskModelNormalizer);

  return Object.freeze(normalized);
};
