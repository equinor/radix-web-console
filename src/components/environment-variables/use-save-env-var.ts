import { usePatchJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { UpdatableEnvVarModel } from '../../models/radix-api/environmentvariables/env-var';

export function useSaveEnvVar(
  appName: string,
  envName: string,
  componentName: string
): AsyncRequestResult<void, Array<UpdatableEnvVarModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  return usePatchJson(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`
  );
}
