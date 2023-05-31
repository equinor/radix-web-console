import { NodeModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a NodeModel object
 */
export const NodeModelNormalizer: ModelNormalizerType<NodeModel> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as NodeModel) }));
