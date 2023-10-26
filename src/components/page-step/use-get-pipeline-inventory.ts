import { useFetchLogJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { InventoryResponseModel } from '../../models/log-api/models/inventory-response';
import { InventoryResponseModelNormalizer } from '../../models/log-api/models/inventory-response/normalizer';

export function useGetPipelineInventory(
  appName: string,
  pipelineJobName: string,
  interval?: { start: Date; end?: Date }
): AsyncLoadingResult<Readonly<InventoryResponseModel>> {
  const encAppName = encodeURIComponent(appName);
  const encPipelineJobName = encodeURIComponent(pipelineJobName);

  const time: Record<string, Date> = {
    start: interval && new Date(interval.start),
    end: interval?.end && new Date(interval.end.getTime() + 10 * 60000),
  };
  const timeInterval = (Object.keys(time) as Array<keyof typeof time>).reduce(
    (o, key) => (time[key] ? `${o}${key}=${time[key].toISOString()}&` : o),
    '?'
  );

  return useFetchLogJson(
    `/applications/${encAppName}/pipelinejobs/${encPipelineJobName}` +
      timeInterval,
    InventoryResponseModelNormalizer
  );
}
