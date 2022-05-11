import { ReplicaSummaryModel, ReplicaSummaryNormalizedModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { DateNormalizer } from '../model-utils';
import { ReplicaStatus } from '../replica-status';

/**
 * Create a ReplicaSummaryNormalizedModel object
 */
export const ReplicaSummaryModelNormalizer: ModelNormalizerType<
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryModel
> = (props) => {
  const normalized = { ...(props as ReplicaSummaryNormalizedModel) };
  const temp = props as ReplicaSummaryModel;

  normalized.created = DateNormalizer(normalized.created);

  if (temp.replicaStatus) {
    // convert `replicaStatus` to `status`, then remove `replicaStatus` property from normalized object
    normalized.status = temp.replicaStatus.status as ReplicaStatus;
    delete (normalized as unknown as ReplicaSummaryModel).replicaStatus;
  }

  return Object.freeze(normalized);
};
