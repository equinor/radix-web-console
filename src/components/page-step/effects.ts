import { useCallback, useEffect, useState } from 'react';

import { useFetchJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { VulnerabilityModel } from '../../models/vulnerability';
import { VulnerabilityModelNormalizer } from '../../models/vulnerability/normalizer';
import { sortCompareNumber } from '../../utils/sort-utils';

const severitySortOrder: { [key: string]: number } = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
};

export function useGroupVulnerabilityList(
  vulnerabilityList: Array<VulnerabilityModel>
): { [key: string]: Array<VulnerabilityModel> } {
  const [groupedVulnerabilities, setGroupedVulnerabilities] = useState<{
    [key: string]: Array<VulnerabilityModel>;
  }>({});

  useEffect(() => {
    const grouped = vulnerabilityList
      ?.sort((a, b) =>
        sortCompareNumber(a.cvss, b.cvss, 'descending', () => {
          return !sortCompareNumber(
            severitySortOrder[a.severity],
            severitySortOrder[b.severity]
          );
        })
      )
      .reduce<{ [key: string]: Array<VulnerabilityModel> }>((p, c) => {
        const vulnerabilities = p[c.severity] ?? [];
        vulnerabilities.push(c);
        p[c.severity] = vulnerabilities;
        return p;
      }, {});
    setGroupedVulnerabilities(grouped);
  }, [vulnerabilityList]);
  return groupedVulnerabilities;
}

export function useGetPipelineJobStepScanOutput(
  appName: string,
  jobName: string,
  stepName: string
): AsyncLoadingResult<Array<Readonly<VulnerabilityModel>>> {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encStepName = encodeURIComponent(stepName);

  return useFetchJson<Array<Readonly<VulnerabilityModel>>>(
    `/applications/${encAppName}/jobs/${encJobName}/steps/${encStepName}/output/scan`,
    useCallback((x: Array<unknown>) => x?.map(VulnerabilityModelNormalizer), [])
  );
}
