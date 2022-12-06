import { useCallback } from 'react';
import { useFetchScanJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { EnvironmentScanSummaryModel } from '../../models/environment-scan-summary';
import { EnvironmentScanSummaryModelNormalizer } from '../../models/environment-scan-summary/normalizer';

export function useGetVulnerabilities(
  appName: string
): AsyncLoadingResult<Readonly<Array<EnvironmentScanSummaryModel>>> {
  const encAppName = encodeURIComponent(appName);

  return useFetchScanJson<Readonly<Array<EnvironmentScanSummaryModel>>>(
    `/applications/vulnerabilities/${encAppName}`,
    useCallback(
      (x: Array<unknown>) => x?.map(EnvironmentScanSummaryModelNormalizer),
      []
    )
  );
}
