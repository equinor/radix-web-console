import { ContainerModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, filterUndefinedFields } from '../../../model-utils';

/**
 * Create a ContainerModel object
 */
export const ContainerModelNormalizer: ModelNormalizerType<ContainerModel> = (
  props
) => {
  const normalized = { ...(props as ContainerModel) };

  normalized.creationTimestamp = dateNormalizer(normalized.creationTimestamp);

  return Object.freeze(filterUndefinedFields(normalized));
};
