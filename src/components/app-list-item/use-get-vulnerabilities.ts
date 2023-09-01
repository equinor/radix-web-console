import { useCallback } from 'react';

import { useFetchScanJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { arrayNormalizer } from '../../models/model-utils';
import { EnvironmentVulnerabilitiesModel } from '../../models/scan-api/models/environment-vulnerabilities';
import { EnvironmentVulnerabilitiesModelNormalizer } from '../../models/scan-api/models/environment-vulnerabilities/normalizer';

export function useGetVulnerabilities(
  appName: string
): AsyncLoadingResult<Readonly<Array<EnvironmentVulnerabilitiesModel>>> {
  const encAppName = encodeURIComponent(appName);

  return useFetchScanJson(
    `/applications/vulnerabilities/${encAppName}`,
    useCallback(
      (x) => arrayNormalizer(x, EnvironmentVulnerabilitiesModelNormalizer),
      []
    )
  );
}
