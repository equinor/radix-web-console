import { ApplicationModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ApplicationModel object
 */
export const ApplicationModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
