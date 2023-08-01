import { ResourcesModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a ResourcesModel object
 */
export const ResourcesModelNormalizer: ModelNormalizerType<
  Readonly<ResourcesModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
