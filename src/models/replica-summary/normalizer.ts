import { ReplicaSummaryModel, ReplicaSummaryNormalizedModel } from '.';

import { ModelNormalizerType } from '../model-types';
import {
  dateNormalizer,
  filterUndefinedFields,
  omitFields,
} from '../model-utils';
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
