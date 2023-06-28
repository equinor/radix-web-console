import { ApplicationModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ApplicationModel object
 */
export const ApplicationModelNormalizer: ModelNormalizerType<
  ApplicationModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as ApplicationModel) }));
