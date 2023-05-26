import { ObjectStateModel } from '.';

import { PodStateModelNormalizer } from '../pod-state/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ObjectStateModel object
 */
export const ObjectStateModelNormalizer: ModelNormalizerType<
  ObjectStateModel
> = (props) => {
  const normalized = { ...(props as ObjectStateModel) };

  normalized.pod = normalized.pod && PodStateModelNormalizer(normalized.pod);

  return Object.freeze(filterUndefinedFields(normalized));
};
