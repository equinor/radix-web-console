import { EnvironmentVariableMetadataModel } from '.';

/**
 * Create a EnvVarMetadata object
 */
export const EnvironmentVariableMetadataNormaliser = (
  props: unknown
): Readonly<EnvironmentVariableMetadataModel> =>
  Object.freeze(props as EnvironmentVariableMetadataModel);

export default EnvironmentVariableMetadataNormaliser;
