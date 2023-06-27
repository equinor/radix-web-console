import { ApplicationCostModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ApplicationCostModel object
 */
export const ApplicationCostModelNormalizer: ModelNormalizerType<
  ApplicationCostModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as ApplicationCostModel) }));
