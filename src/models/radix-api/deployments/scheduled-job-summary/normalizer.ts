import { ScheduledJobSummaryModel } from '.';

import { NodeModelNormalizer } from '../node/normalizer';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';
import { ResourceRequirementsModelNormalizer } from '../resource-requirements/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  filterUndefinedFields,
} from '../../../model-utils';

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
    ResourceRequirementsModelNormalizer(normalized.resources);
  normalized.node = normalized.node && NodeModelNormalizer(normalized.node);

  return Object.freeze(filterUndefinedFields(normalized));
};
