import { PortModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a PortModel object
 */
export const PortModelNormalizer: ModelNormalizerType<Readonly<PortModel>> = (
  props
) => Object.freeze(objectNormalizer(props, {}));
