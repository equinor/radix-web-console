import { ResourceRequirementsModel } from '.';

import { ResourcesModelNormalizer } from '../resources/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ResourceRequirementsModel object
 */
export const ResourceRequirementsModelNormalizer: ModelNormalizerType<
  ResourceRequirementsModel
> = (props) => {
  const normalized = { ...(props as ResourceRequirementsModel) };

  normalized.limits =
    normalized.limits && ResourcesModelNormalizer(normalized.limits);
  normalized.requests =
    normalized.requests && ResourcesModelNormalizer(normalized.requests);

  return Object.freeze(filterUndefinedFields(normalized));
};
