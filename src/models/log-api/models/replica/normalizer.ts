import { ReplicaModel } from '.';

import { ContainerModelNormalizer } from '../container/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  objectNormalizer,
} from '../../../model-utils';

/**
 * Create a ReplicaModel object
 */
export const ReplicaModelNormalizer: ModelNormalizerType<
  Readonly<ReplicaModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<ReplicaModel>(props, {
      creationTimestamp: dateNormalizer,
      lastKnown: dateNormalizer,
      containers: (x: []) => arrayNormalizer(x, ContainerModelNormalizer),
    })
  );
