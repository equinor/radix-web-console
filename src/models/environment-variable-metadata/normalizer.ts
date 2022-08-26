import { EnvironmentVariableMetadataModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an EnvironmentVariableMetadataModel object
 */
export const EnvironmentVariableMetadataModelNormalizer: ModelNormalizerType<
  EnvironmentVariableMetadataModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({ ...(props as EnvironmentVariableMetadataModel) })
  );
