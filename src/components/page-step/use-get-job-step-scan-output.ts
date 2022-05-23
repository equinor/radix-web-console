import { useCallback } from 'react';

import { useFetchJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { arrayNormalizer } from '../../models/model-utils';
import { VulnerabilityModel } from '../../models/vulnerability';
import { VulnerabilityModelNormalizer } from '../../models/vulnerability/normalizer';

export function useGetJobStepScanOutput(
  appName: string,
  jobName: string,
  stepName: string
): AsyncLoadingResult<Array<Readonly<VulnerabilityModel>>> {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encStepName = encodeURIComponent(stepName);

  return useFetchJson<Array<Readonly<VulnerabilityModel>>>(
    `/applications/${encAppName}/jobs/${encJobName}/steps/${encStepName}/output/scan`,
    useCallback((x: []) => arrayNormalizer(x, VulnerabilityModelNormalizer), [])
  );
}
