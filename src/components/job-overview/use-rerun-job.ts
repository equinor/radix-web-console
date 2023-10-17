import { usePostJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export const useRerunJob = (
  appName: string,
  jobName: string
): AsyncRequestResult<void, void> => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);

  return usePostJson(`/applications/${encAppName}/jobs/${encJobName}/rerun`);
};
