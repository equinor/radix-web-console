import { InventoryResponseModel } from '.';

import { ReplicaModelNormalizer } from '../replica/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { arrayNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create an InventoryResponseModel object
 */
export const InventoryResponseModelNormalizer: ModelNormalizerType<
  Readonly<InventoryResponseModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      replicas: (x) => arrayNormalizer(x, ReplicaModelNormalizer),
    })
  );
