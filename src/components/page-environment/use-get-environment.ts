import { useFetchJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { EnvironmentModel } from '../../models/radix-api/environments/environment';
import { EnvironmentModelNormalizer } from '../../models/radix-api/environments/environment/normalizer';

export function useGetEnvironment(
  appName: string,
  envName: string
): AsyncLoadingResult<Readonly<EnvironmentModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);

  return useFetchJson(
    `/applications/${encAppName}/environments/${encEnvName}`,
    EnvironmentModelNormalizer
  );
}
