import { AlertConfigModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an AlertConfigModel object
 */
export const AlertConfigModelNormalizer: ModelNormalizerType<
  AlertConfigModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as AlertConfigModel) }));
