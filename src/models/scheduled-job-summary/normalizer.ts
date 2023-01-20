import { ScheduledJobSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  filterUndefinedFields,
} from '../model-utils';
import {
  ReplicaNodeModelNormalizer,
  ReplicaResourcesModelNormalizer,
} from '../replica-attributes/normalizer';
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
  normalized.resources =
    normalized.resources &&
    ReplicaResourcesModelNormalizer(normalized.resources);
  normalized.node =
    normalized.node && ReplicaNodeModelNormalizer(normalized.node);

  return Object.freeze(filterUndefinedFields(normalized));
};
