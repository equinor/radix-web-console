import { useEffect, useState } from 'react';

import { useFetchJson } from '../../effects';
import vulnerabilityNormaliser from '../../models/vulnerability/normaliser';

const normaliseVulnerabilityList = (vulnerabilities) => {
  if (!vulnerabilities) {
    return [];
  }

  return [...vulnerabilities.map((v) => vulnerabilityNormaliser(v))];
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
    const grouped = vulnerabilityList.reduce((p, c) => {
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
