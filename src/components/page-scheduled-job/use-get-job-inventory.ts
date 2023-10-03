import { useFetchLogJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { InventoryResponseModel } from '../../models/log-api/models/inventory-response';
import { InventoryResponseModelNormalizer } from '../../models/log-api/models/inventory-response/normalizer';

export function useGetJobInventory(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string
): AsyncLoadingResult<Readonly<InventoryResponseModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encJobName = encodeURIComponent(jobName);

  return useFetchLogJson(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encJobName}`,
    InventoryResponseModelNormalizer
  );
}
