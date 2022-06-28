import { ScheduledJobSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer, dateNormalizer } from '../model-utils';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';

/**
 * Create a ScheduledJobSummaryModel object
 */
export const ScheduledJobSummaryModelNormalizer: ModelNormalizerType<
  ScheduledJobSummaryModel
> = (props) => {
  const normalized = { ...(props as ScheduledJobSummaryModel) };

  normalized.created = dateNormalizer(normalized.created);
  normalized.started = dateNormalizer(normalized.started);
  normalized.ended = dateNormalizer(normalized.ended);
  normalized.replicaList = arrayNormalizer(
    normalized.replicaList,
    ReplicaSummaryModelNormalizer
  );

  return Object.freeze(normalized);
};
