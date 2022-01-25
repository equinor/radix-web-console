import {
  EnvironmentVariableModel,
  EnvironmentVariableNormalisedModel,
} from '.';

/**
 * Create an EnvironmentVariable object
 */
export const EnvironmentVariableNormaliser = (
  props: EnvironmentVariableModel | unknown
): Readonly<EnvironmentVariableNormalisedModel> => {
  const envVar = { ...(props as any) } as EnvironmentVariableNormalisedModel;
  envVar.isRadixVariable = !!envVar.name?.match('(RADIX|RADIXOPERATOR)_*');

  return Object.freeze(envVar);
};
