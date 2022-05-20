import { usePollingPlain } from '../../effects';

export const usePollLogs = (
  appName: string,
  jobName: string,
  pipelineRunName: string,
  taskName: string,
  stepName: string
) => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encPipelineRunName = encodeURIComponent(pipelineRunName);
  const encTaskName = encodeURIComponent(taskName);
  const encStepName = encodeURIComponent(stepName);

  return usePollingPlain<string>(
    `/applications/${encAppName}/jobs/${encJobName}/pipelineruns/${encPipelineRunName}/tasks/${encTaskName}/logs/${encStepName}`,
    5000
  );
};
