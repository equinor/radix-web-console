import { ComponentInventoryResponseModel } from '.';

import { ReplicaModelNormalizer } from '../replica/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { arrayNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a ComponentInventoryResponseModel object
 */
export const ComponentInventoryResponseModelNormalizer: ModelNormalizerType<
  Readonly<ComponentInventoryResponseModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      replicas: (x) => arrayNormalizer(x, ReplicaModelNormalizer),
    })
  );
