import { EnvVarMetadataModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an EnvVarMetadataModel object
 */
export const EnvVarMetadataModelNormalizer: ModelNormalizerType<
  EnvVarMetadataModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as EnvVarMetadataModel) }));
