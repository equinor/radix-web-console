import { ApplicationCostModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ApplicationCostModel object
 */
export const ApplicationCostModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationCostModel>
> = (props) => Object.freeze(objectNormalizer<ApplicationCostModel>(props, {}));
