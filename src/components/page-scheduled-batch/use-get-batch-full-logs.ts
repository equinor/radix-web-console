import { useGetPlain } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useGetBatchFullLogs(
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledBatchName: string
): AsyncRequestResult<string, void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledBatchName = encodeURIComponent(scheduledBatchName);

  return useGetPlain(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/scheduledjobs/${encScheduledBatchName}/logs?file=true`
  );
}