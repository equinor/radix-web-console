import {
  ReplicaNodeModel,
  ReplicaResourceModel,
  ReplicaResourcesModel,
} from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an ReplicaNodeModel object
 */
export const ReplicaNodeModelNormalizer: ModelNormalizerType<
  ReplicaNodeModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as ReplicaNodeModel) }));

/**
 * Create an ReplicaResourceModel object
 */
export const ReplicaResourceModelNormalizer: ModelNormalizerType<
  ReplicaResourceModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as ReplicaResourceModel) }));

/**
 * Create an ReplicaResourcesModel object
 */
export const ReplicaResourcesModelNormalizer: ModelNormalizerType<
  ReplicaResourcesModel
> = (props) => {
  const normalized = { ...(props as ReplicaResourcesModel) };

  normalized.limits =
    normalized.limits && ReplicaResourceModelNormalizer(normalized.limits);
  normalized.requests =
    normalized.requests && ReplicaResourceModelNormalizer(normalized.requests);

  return Object.freeze(filterUndefinedFields(normalized));
};
