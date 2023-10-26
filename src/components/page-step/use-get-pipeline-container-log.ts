import { useFetchLogPlain } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';

export function useGetPipelineContainerLog(
  appName: string,
  pipelineJobName: string,
  replicaName: string,
  containerId: string,
  interval?: { start: Date; end?: Date }
): AsyncLoadingResult<string> {
  const encAppName = encodeURIComponent(appName);
  const encPipelineJobName = encodeURIComponent(pipelineJobName);
  const encReplicaName = encodeURIComponent(replicaName);
  const encContainerId = encodeURIComponent(containerId);

  const time: Record<string, Date> = {
    start: interval && new Date(interval.start),
    end: interval?.end && new Date(interval.end.getTime() + 10 * 60000),
  };
  const timeInterval = (Object.keys(time) as Array<keyof typeof time>).reduce(
    (o, key) => (time[key] ? `${o}${key}=${time[key].toISOString()}&` : o),
    '?'
  );

  return useFetchLogPlain(
    `/applications/${encAppName}/pipelinejobs/${encPipelineJobName}/replicas/${encReplicaName}/containers/${encContainerId}/log` +
      timeInterval
  );
}
