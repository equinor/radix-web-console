import { useGetPlain } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useGetJobStepFullLogs(
  appName: string,
  jobName: string,
  stepName: string
): AsyncRequestResult<string, void> {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encStepName = encodeURIComponent(stepName);

  return useGetPlain(
    `/applications/${encAppName}/jobs/${encJobName}/logs/${encStepName}?file=true`
  );
}
