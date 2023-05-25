import { PodStateModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a PodStateModel object
 */
export const PodStateModelNormalizer: ModelNormalizerType<PodStateModel> = (
  props
) => Object.freeze(filterUndefinedFields({ ...(props as PodStateModel) }));
