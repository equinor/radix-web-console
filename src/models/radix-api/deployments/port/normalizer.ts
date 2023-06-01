import { PortModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a PortModel object
 */
export const PortModelNormalizer: ModelNormalizerType<PortModel> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as PortModel) }));
