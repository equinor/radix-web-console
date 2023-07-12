import { PodStateModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a PodStateModel object
 */
export const PodStateModelNormalizer: ModelNormalizerType<
  Readonly<PodStateModel>
> = (props) => Object.freeze(objectNormalizer<PodStateModel>(props, {}));
