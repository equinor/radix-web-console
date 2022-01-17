import {
  EnvironmentVariableModel,
  EnvironmentVariableNormalizedModel,
} from '.';

/**
 * Create an EnvironmentVariable object
 */
export const EnvironmentVariableNormaliser = (
  props: EnvironmentVariableModel | unknown
): Readonly<EnvironmentVariableNormalizedModel> => {
  const envVar = { ...(props as any) } as EnvironmentVariableNormalizedModel;
  envVar.isRadixVariable = !!envVar.name?.match('(RADIX|RADIXOPERATOR)_*');

  return Object.freeze(envVar);
};
