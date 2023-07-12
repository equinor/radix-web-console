import { AlertConfigModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an AlertConfigModel object
 */
export const AlertConfigModelNormalizer: ModelNormalizerType<
  Readonly<AlertConfigModel>
> = (props) => Object.freeze(objectNormalizer<AlertConfigModel>(props, {}));
