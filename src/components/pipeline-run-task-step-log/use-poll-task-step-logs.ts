import { usePollingPlain } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';

export const usePollLogs = (
  appName: string,
  jobName: string,
  pipelineRunName: string,
  taskName: string,
  stepName: string
): AsyncPollingResult<Readonly<string>> => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encPipelineRunName = encodeURIComponent(pipelineRunName);
  const encTaskName = encodeURIComponent(taskName);
  const encStepName = encodeURIComponent(stepName);

  return usePollingPlain(
    `/applications/${encAppName}/jobs/${encJobName}/pipelineruns/${encPipelineRunName}/tasks/${encTaskName}/logs/${encStepName}?lines=1000`,
    5000
  );
};
