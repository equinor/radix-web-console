import { useFetchLogJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { ComponentInventoryResponseModel } from '../../models/log-api/models/component-inventory-response';
import { ComponentInventoryResponseModelNormalizer } from '../../models/log-api/models/component-inventory-response/normalizer';

export function useGetComponentInventory(
  appName: string,
  envName: string,
  componentName: string
): AsyncLoadingResult<Readonly<ComponentInventoryResponseModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  return useFetchLogJson(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}`,
    ComponentInventoryResponseModelNormalizer
  );
}
