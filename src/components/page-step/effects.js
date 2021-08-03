import { useEffect, useState } from 'react';

import { useFetchJson } from '../../effects';
import vulnerabilityNormaliser from '../../models/vulnerability/normaliser';

const severitySortOrder = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
};

const normaliseVulnerabilityList = (vulnerabilities) => {
  if (!vulnerabilities) {
    return [];
  }

  return [...vulnerabilities.map((v) => vulnerabilityNormaliser(v))];
};

const vulnerabilitySorter = (a, b) => {
  let compare =
    (severitySortOrder[a.severity] ?? 999) -
    (severitySortOrder[b.severity] ?? 999);

  if (compare === 0) {
    compare = -((a.cvss || 0) - (b.cvss || 0));
  }

  return compare;
};

export const useNormaliseVulnerabilityList = (vulnerabilityList) => {
  const [
    normalisedVulnerabilityList,
    setNormalisedVulnerabilityList,
  ] = useState([]);

  useEffect(() => {
    setNormalisedVulnerabilityList(
      normaliseVulnerabilityList(vulnerabilityList)
    );
  }, [vulnerabilityList]);

  return normalisedVulnerabilityList;
};

export const useGroupVulnerabilityList = (vulnerabilityList) => {
  const [groupedVulnerabilities, setGroupedVulnerabilities] = useState([]);

  useEffect(() => {
    const sortedVulnerabilities = [...vulnerabilityList].sort(
      vulnerabilitySorter
    );
    const grouped = sortedVulnerabilities.reduce((p, c) => {
      const vulnerabilities = p[c.severity] ?? [];
      vulnerabilities.push(c);
      p[c.severity] = vulnerabilities;
      return p;
    }, []);
    setGroupedVulnerabilities(grouped);
  }, [vulnerabilityList]);

  return groupedVulnerabilities;
};

export const useGetPipelineJobStepScanOutput = (appName, jobName, stepName) => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encStepName = encodeURIComponent(stepName);
  const path = `/applications/${encAppName}/jobs/${encJobName}/steps/${encStepName}/output/scan`;

  return useFetchJson(path);
};
