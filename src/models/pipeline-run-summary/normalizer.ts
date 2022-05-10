import { PipelineRunSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { PipelineTaskSummaryModelNormalizer } from '../pipeline-task-summary/normalizer';
import { isNaN } from 'lodash';

/**
 * Create a PipelineRunSummaryModel object
 */
export const PipelineRunSummaryModelNormalizer: ModelNormalizerType<
  PipelineRunSummaryModel
> = (props) => {
  const normalized = { ...(props as PipelineRunSummaryModel) };

  const ended = new Date(normalized.ended);
  const started = new Date(normalized.started);

  normalized.started = isNaN(started?.valueOf()) ? undefined : started;
  normalized.ended = isNaN(ended?.valueOf()) ? undefined : ended;
  normalized.tasks = normalized.tasks?.map(PipelineTaskSummaryModelNormalizer);

  return Object.freeze(normalized);
};
