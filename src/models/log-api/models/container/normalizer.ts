import { ContainerModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a ContainerModel object
 */
export const ContainerModelNormalizer: ModelNormalizerType<
  Readonly<ContainerModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      creationTimestamp: dateNormalizer,
      lastKnown: dateNormalizer,
    })
  );
