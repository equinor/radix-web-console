import { EnvironmentVariableMetadataModel } from '.';

import { ModelNormaliserType } from '../model-types';

/**
 * Create an EnvironmentVariableMetadata object
 */
export const EnvironmentVariableMetadataNormaliser: ModelNormaliserType<EnvironmentVariableMetadataModel> =
  (props) => Object.freeze(props as EnvironmentVariableMetadataModel);
