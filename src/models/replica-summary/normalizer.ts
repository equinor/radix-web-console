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
  normalized.status = temp.replicaStatus?.status as ReplicaStatusEnum;

  if (temp.replicaStatus) {
    // remove raw replicaStatus property from normalized object
    delete (normalized as unknown as ReplicaSummaryModel).replicaStatus;
  }

  return Object.freeze(normalized);
};
