import { useGetPlainText } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export const useGetFullLogs = (
  appName: string,
  jobName: string,
  pipelineRunName: string,
  taskName: string,
  stepName: string
): AsyncRequestResult<string, void> => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encPipelineRunName = encodeURIComponent(pipelineRunName);
  const encTaskName = encodeURIComponent(taskName);
  const encStepName = encodeURIComponent(stepName);

  return useGetPlainText<string>(
    `/applications/${encAppName}/jobs/${encJobName}/pipelineruns/${encPipelineRunName}/tasks/${encTaskName}/logs/${encStepName}?file=true`
  );
};
