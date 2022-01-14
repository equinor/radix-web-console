import { EnvironmentVariableMetadataModel } from '.';

/**
 * Create a EnvironmentVariableMetadata object
 */
export const EnvironmentVariableMetadataNormaliser = (
  props: unknown
): Readonly<EnvironmentVariableMetadataModel> =>
  Object.freeze(props as EnvironmentVariableMetadataModel);

export default EnvironmentVariableMetadataNormaliser;
