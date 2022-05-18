import { useFetchScanJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { EnvironmentScanSummaryModel } from '../../models/environment-scan-summary';
import { EnvironmentScanSummaryModelNormalizer } from '../../models/environment-scan-summary/normalizer';

export function useGetEnvironmentScans(
  appName: string,
  envName: string
): AsyncLoadingResult<Readonly<EnvironmentScanSummaryModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);

  return useFetchScanJson<Readonly<EnvironmentScanSummaryModel>>(
    `/applications/${encAppName}/environments/${encEnvName}`,
    EnvironmentScanSummaryModelNormalizer
  );
}
