import { PortModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create a PortModel object
 */
export const PortModelNormalizer: ModelNormalizerType<PortModel> = (props) =>
  Object.freeze({ ...(props as PortModel) });
