import { useFetchScanJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { EnvironmentVulnerabilitiesModel } from '../../models/scan-api/models/environment-vulnerabilities';
import { EnvironmentVulnerabilitiesModelNormalizer } from '../../models/scan-api/models/environment-vulnerabilities/normalizer';

export function useGetEnvironmentScans(
  appName: string,
  envName: string
): AsyncLoadingResult<Readonly<EnvironmentVulnerabilitiesModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);

  return useFetchScanJson(
    `/applications/${encAppName}/environments/${encEnvName}`,
    EnvironmentVulnerabilitiesModelNormalizer
  );
}
