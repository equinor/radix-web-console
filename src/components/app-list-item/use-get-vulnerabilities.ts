import { useCallback } from 'react';
import { useFetchScanJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { EnvironmentVulnerabilitiesModel } from '../../models/scan-api/models/environment-vulnerabilities';
import { EnvironmentVulnerabilitiesModelNormalizer } from '../../models/scan-api/models/environment-vulnerabilities/normalizer';

export function useGetVulnerabilities(
  appName: string
): AsyncLoadingResult<Readonly<Array<EnvironmentVulnerabilitiesModel>>> {
  const encAppName = encodeURIComponent(appName);

  return useFetchScanJson<Readonly<Array<EnvironmentVulnerabilitiesModel>>>(
    `/applications/vulnerabilities/${encAppName}`,
    useCallback(
      (x: Array<unknown>) => x?.map(EnvironmentVulnerabilitiesModelNormalizer),
      []
    )
  );
}
