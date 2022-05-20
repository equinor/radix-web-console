import { useFetchJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { EnvironmentModel } from '../../models/environment';
import { EnvironmentModelNormalizer } from '../../models/environment/normalizer';

export function useGetEnvironment(
  appName: string,
  envName: string
): AsyncLoadingResult<Readonly<EnvironmentModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);

  return useFetchJson<Readonly<EnvironmentModel>>(
    `/applications/${encAppName}/environments/${encEnvName}`,
    EnvironmentModelNormalizer
  );
}
