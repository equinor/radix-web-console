import { ReplicaSummaryModel, ReplicaSummaryNormalizedModel } from '.';

import { ReplicaStatus } from '../replica-status';
import { ResourceRequirementsModelNormalizer } from '../resource-requirements/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  dateNormalizer,
  objectNormalizer,
  omitFields,
} from '../../../model-utils';

/**
 * Create a ReplicaSummaryNormalizedModel object
 */
export const ReplicaSummaryModelNormalizer: ModelNormalizerType<
  Readonly<ReplicaSummaryNormalizedModel>,
  ReplicaSummaryModel
> = (props) => {
  const normalized = objectNormalizer(
    props as unknown as ReplicaSummaryNormalizedModel,
    {
      created: dateNormalizer,
      resources: ResourceRequirementsModelNormalizer,
    }
  );
  normalized.status = (props as ReplicaSummaryModel).replicaStatus
    ?.status as ReplicaStatus;

  return Object.freeze(
    omitFields<
      ReplicaSummaryNormalizedModel,
      keyof ReplicaSummaryModel,
      ReplicaSummaryModel
    >(
      normalized,
      ['replicaStatus'] // omit the replicaStatus key from the input model
    )
  );
};
