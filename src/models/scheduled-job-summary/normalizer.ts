import { ScheduledJobSummaryModel } from '.';
import { ModelNormalizerType } from '../model-types';

import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';

/**
 * Create a ScheduledJobSummaryModel object
 */
export const ScheduledJobSummaryModelNormalizer: ModelNormalizerType<
  ScheduledJobSummaryModel
> = (props) => {
  const normalized = { ...(props as ScheduledJobSummaryModel) };

  const created = new Date(normalized.created);
  const ended = new Date(normalized.ended);
  const started = new Date(normalized.started);

  normalized.started = isNaN(started?.valueOf()) ? undefined : started;
  normalized.ended = isNaN(ended?.valueOf()) ? undefined : ended;
  normalized.created = isNaN(created?.valueOf()) ? undefined : created;
  normalized.replicaList = normalized.replicaList?.map(
    ReplicaSummaryModelNormalizer
  );

  return Object.freeze(normalized);
};
