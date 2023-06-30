import { ResourceRequirementsModel } from '.';

import { ResourcesModelNormalizer } from '../resources/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a ResourceRequirementsModel object
 */
export const ResourceRequirementsModelNormalizer: ModelNormalizerType<
  Readonly<ResourceRequirementsModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<ResourceRequirementsModel>(props, {
      limits: ResourcesModelNormalizer,
      requests: ResourcesModelNormalizer,
    })
  );
