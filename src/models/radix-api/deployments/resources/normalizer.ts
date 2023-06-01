import { ResourcesModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a ResourcesModel object
 */
export const ResourcesModelNormalizer: ModelNormalizerType<ResourcesModel> = (
  props
) => Object.freeze(filterUndefinedFields({ ...(props as ResourcesModel) }));
