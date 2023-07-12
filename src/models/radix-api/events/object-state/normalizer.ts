import { ObjectStateModel } from '.';

import { PodStateModelNormalizer } from '../pod-state/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ObjectStateModel object
 */
export const ObjectStateModelNormalizer: ModelNormalizerType<
  Readonly<ObjectStateModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<ObjectStateModel>(props, { pod: PodStateModelNormalizer })
  );
