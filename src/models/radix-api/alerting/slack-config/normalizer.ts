import { SlackConfigModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a SlackConfigModel object
 */
export const SlackConfigModelNormalizer: ModelNormalizerType<
  Readonly<SlackConfigModel>
> = (props) => Object.freeze(objectNormalizer<SlackConfigModel>(props, {}));
