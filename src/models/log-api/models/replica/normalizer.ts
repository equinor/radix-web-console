import { ReplicaModel } from '.';

import { ContainerModelNormalizer } from '../container/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  filterUndefinedFields,
} from '../../../model-utils';

/**
 * Create a ReplicaModel object
 */
export const ReplicaModelNormalizer: ModelNormalizerType<ReplicaModel> = (
  props
) => {
  const normalized = { ...(props as ReplicaModel) };

  normalized.creationTimestamp = dateNormalizer(normalized.creationTimestamp);
  normalized.lastKnown = dateNormalizer(normalized.lastKnown);
  normalized.containers = arrayNormalizer(
    normalized.containers,
    ContainerModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
