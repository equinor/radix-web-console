import { ComponentInventoryResponseModel } from '.';

import { ReplicaModelNormalizer } from '../replica/normalizer';
import { ModelNormalizerType } from '../../model-types';
import { arrayNormalizer, filterUndefinedFields } from '../../model-utils';

/**
 * Create a ComponentInventoryResponseModel object
 */
export const ComponentInventoryResponseModelNormalizer: ModelNormalizerType<
  ComponentInventoryResponseModel
> = (props) => {
  const normalized = { ...(props as ComponentInventoryResponseModel) };

  normalized.replicas = arrayNormalizer(
    normalized.replicas,
    ReplicaModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
