import { usePostJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export const useStopJob = (
  appName: string,
  jobName: string
): AsyncRequestResult<void, void> => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);

  return usePostJson<void, void, void>(
    `/applications/${encAppName}/jobs/${encJobName}/stop`
  );
};
