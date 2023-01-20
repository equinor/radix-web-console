import { ReplicaSummaryModel, ReplicaSummaryNormalizedModel } from '.';

import { ModelNormalizerType } from '../model-types';
import {
  dateNormalizer,
  filterUndefinedFields,
  omitFields,
} from '../model-utils';
import { ReplicaResourcesModelNormalizer } from '../replica-attributes/normalizer';
import { ReplicaStatus } from '../replica-status';

/**
 * Create a ReplicaSummaryNormalizedModel object
 */
export const ReplicaSummaryModelNormalizer: ModelNormalizerType<
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryModel
> = (props) => {
  const normalized = { ...(props as ReplicaSummaryNormalizedModel) };

  normalized.created = dateNormalizer(normalized.created);
  normalized.status = (props as ReplicaSummaryModel).replicaStatus
    ?.status as ReplicaStatus;
  normalized.resources =
    normalized.resources &&
    ReplicaResourcesModelNormalizer(normalized.resources);

  return Object.freeze(
    omitFields<
      ReplicaSummaryNormalizedModel,
      keyof ReplicaSummaryModel,
      ReplicaSummaryModel
    >(
      filterUndefinedFields(normalized),
      ['replicaStatus'] // omit the replicaStatus key from the input model
    )
  );
};
