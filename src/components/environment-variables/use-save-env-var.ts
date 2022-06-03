import { usePatchJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { UpdatableEnvironmentVariableModel } from '../../models/environment-variable';

export function useSaveEnvVar(
  appName: string,
  envName: string,
  componentName: string
): AsyncRequestResult<void, Array<UpdatableEnvironmentVariableModel>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  return usePatchJson(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`
  );
}
