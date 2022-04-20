import { PodStateModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create a PodStateModel object
 */
export const PodStateModelNormalizer: ModelNormalizerType<PodStateModel> = (
  props
) => Object.freeze({ ...(props as PodStateModel) });
