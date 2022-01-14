import { EnvironmentVariableMetadataModel } from '.';

/**
 * Create an EnvironmentVariableMetadata object
 */
export const EnvironmentVariableMetadataNormaliser = (
  props: EnvironmentVariableMetadataModel | unknown
): Readonly<EnvironmentVariableMetadataModel> =>
  Object.freeze(props as EnvironmentVariableMetadataModel);

export default EnvironmentVariableMetadataNormaliser;
