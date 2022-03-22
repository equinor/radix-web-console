import { ApplicationCostModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create an ApplicationCostModel object
 */
export const ApplicationCostModelNormalizer: ModelNormalizerType<
  ApplicationCostModel
> = (props) => Object.freeze({ ...(props as ApplicationCostModel) });
