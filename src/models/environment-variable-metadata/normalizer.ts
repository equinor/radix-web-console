import { EnvironmentVariableMetadataModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create an EnvironmentVariableMetadataModel object
 */
export const EnvironmentVariableMetadataModelNormalizer: ModelNormalizerType<
  EnvironmentVariableMetadataModel
> = (props) => Object.freeze(props as EnvironmentVariableMetadataModel);
