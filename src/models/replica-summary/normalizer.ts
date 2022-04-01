import { ReplicaSummaryModel, ReplicaSummaryNormalizedModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { ReplicaStatusEnum } from '../replica-status-enum';

/**
 * Create a ReplicaSummaryNormalizedModel object
 */
export const ReplicaSummaryModelNormalizer: ModelNormalizerType<
  ReplicaSummaryModel,
  ReplicaSummaryNormalizedModel
> = (props) => {
  const normalized = { ...(props as ReplicaSummaryNormalizedModel) };
  const temp = props as ReplicaSummaryModel;

  const created = new Date(temp.created);

  normalized.created = isNaN(created?.valueOf()) ? undefined : created;

  if (temp.replicaStatus) {
    // convert `replicaStatus` to `status`, then remove `replicaStatus` property from normalized object
    normalized.status = temp.replicaStatus.status as ReplicaStatusEnum;
    delete (normalized as unknown as ReplicaSummaryModel).replicaStatus;
  }

  return Object.freeze(normalized);
};
