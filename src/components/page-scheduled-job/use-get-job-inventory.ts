import { useFetchLogJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { InventoryResponseModel } from '../../models/log-api/models/inventory-response';
import { InventoryResponseModelNormalizer } from '../../models/log-api/models/inventory-response/normalizer';

export function useGetJobInventory(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string,
  interval?: { start: Date; end?: Date }
): AsyncLoadingResult<Readonly<InventoryResponseModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encJobName = encodeURIComponent(jobName);

  const time: Record<string, Date> = {
    start: interval && new Date(interval.start),
    end: interval?.end && new Date(interval.end.getTime() + 10 * 60000),
  };
  const timeInterval = (Object.keys(time) as Array<keyof typeof time>).reduce(
    (o, key) => (time[key] ? `${o}${key}=${time[key].toISOString()}&` : o),
    '?'
  );

  return useFetchLogJson(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encJobName}` +
      timeInterval,
    InventoryResponseModelNormalizer
  );
}
