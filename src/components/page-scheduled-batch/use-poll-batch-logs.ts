import { usePollingPlain } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';

export function usePollBatchLogs(
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledBatchName: string
): AsyncPollingResult<Readonly<string>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledBatchName = encodeURIComponent(scheduledBatchName);

  return usePollingPlain(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/scheduledjobs/${encScheduledBatchName}/logs`,
    5000
  );
}
