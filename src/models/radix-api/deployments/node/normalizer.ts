import { NodeModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a NodeModel object
 */
export const NodeModelNormalizer: ModelNormalizerType<Readonly<NodeModel>> = (
  props
) => Object.freeze(objectNormalizer<NodeModel>(props, {}));
