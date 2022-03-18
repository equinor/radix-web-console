import { ScheduledBatchSummaryModel } from '.';
import { ModelNormalizerType } from '../model-types';
import { ScheduledJobSummaryModelNormalizer } from '../scheduled-job-summary/normalizer';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';

/**
 * Create a ScheduledBatchSummaryModel object
 */
export const ScheduledBatchSummaryModelNormalizer: ModelNormalizerType<
  ScheduledBatchSummaryModel
> = (props) => {
  const normalized = { ...(props as ScheduledBatchSummaryModel) };

  const created = new Date(normalized.created);
  const ended = new Date(normalized.ended);
  const started = new Date(normalized.started);

  normalized.started = isNaN(started?.valueOf()) ? undefined : started;
  normalized.ended = isNaN(ended?.valueOf()) ? undefined : ended;
  normalized.created = isNaN(created?.valueOf()) ? undefined : created;
  normalized.replica =
    normalized.replica === null
      ? undefined
      : ReplicaSummaryModelNormalizer(normalized.replica);
  normalized.jobList = normalized.jobList?.map(
    ScheduledJobSummaryModelNormalizer
  );

  return Object.freeze(normalized);
};
