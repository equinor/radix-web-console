import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { ScheduledBatchSummaryModel } from '../../models/scheduled-batch-summary';
import { ScheduledBatchSummaryModelNormalizer } from '../../models/scheduled-batch-summary/normalizer';

export function useSelectScheduledBatch(
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledBatchName: string
): AsyncPollingResult<Readonly<ScheduledBatchSummaryModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledBatchName = encodeURIComponent(scheduledBatchName);

  return usePollingJson(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/batches/${encScheduledBatchName}`,
    5000,
    ScheduledBatchSummaryModelNormalizer
  );
}
