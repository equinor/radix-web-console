import { EnvironmentVariableNormalizedModel } from '.';

/**
 * Create a EnvVar object
 */
export const EnvironmentVariableNormaliser = (
  props: unknown
): Readonly<EnvironmentVariableNormalizedModel> => {
  const envVar = { ...(props as any) } as EnvironmentVariableNormalizedModel;
  envVar.isRadixVariable = !!envVar.name?.match('(RADIX|RADIXOPERATOR)_*');
  envVar.isChanged =
    envVar.value != null && envVar.value === envVar.metadata?.radixConfigValue;

  return Object.freeze(envVar);
};
