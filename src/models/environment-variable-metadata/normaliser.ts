import { EnvironmentVariableMetadataModel } from '.';

import { ModelNormaliserType } from '../model-types';

/**
 * Create an EnvironmentVariableMetadata object
 */
export const EnvironmentVariableMetadataModelNormaliser: ModelNormaliserType<EnvironmentVariableMetadataModel> =
  (props) => Object.freeze(props as EnvironmentVariableMetadataModel);
