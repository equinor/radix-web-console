import { useGetLogPlain } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useGetReplicaContainerLog(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string,
  replicaName: string,
  containerId: string
): AsyncRequestResult<string, void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encJobName = encodeURIComponent(jobName);
  const encReplicaName = encodeURIComponent(replicaName);
  const encContainerId = encodeURIComponent(containerId);

  return useGetLogPlain(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encJobName}/replicas/${encReplicaName}/containers/${encContainerId}/log`
  );
}
