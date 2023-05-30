import { SlackConfigModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a SlackConfigModel object
 */
export const SlackConfigModelNormalizer: ModelNormalizerType<
  SlackConfigModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as SlackConfigModel) }));
