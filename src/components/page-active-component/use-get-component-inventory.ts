import { useFetchLogJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { InventoryResponseModel } from '../../models/log-api/models/inventory-response';
import { InventoryResponseModelNormalizer } from '../../models/log-api/models/inventory-response/normalizer';

export function useGetComponentInventory(
  appName: string,
  envName: string,
  componentName: string
): AsyncLoadingResult<Readonly<InventoryResponseModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  return useFetchLogJson(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}`,
    InventoryResponseModelNormalizer
  );
}
