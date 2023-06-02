import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { ScheduledJobSummaryModel } from '../../models/radix-api/deployments/scheduled-job-summary';
import { ScheduledJobSummaryModelNormalizer } from '../../models/radix-api/deployments/scheduled-job-summary/normalizer';

export function useSelectScheduledJob(
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledJobName: string
): AsyncPollingResult<Readonly<ScheduledJobSummaryModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledJobName = encodeURIComponent(scheduledJobName);

  return usePollingJson(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encScheduledJobName}`,
    5000,
    ScheduledJobSummaryModelNormalizer
  );
}
