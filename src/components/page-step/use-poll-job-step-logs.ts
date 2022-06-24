import { useGetPlain, usePollingPlain } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { AsyncPollingResult } from '../../effects/use-async-polling';

export function usePollJobStepLogs(
  appName: string,
  jobName: string,
  stepName: string
): AsyncPollingResult<Readonly<string>> {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encStepName = encodeURIComponent(stepName);

  return usePollingPlain(
    `/applications/${encAppName}/jobs/${encJobName}/logs/${encStepName}?lines=1000`,
    5000
  );
}
