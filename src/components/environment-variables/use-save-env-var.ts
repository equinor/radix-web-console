import { usePatchJson } from '../../effects';
import { UpdatableEnvironmentVariableModel } from '../../models/environment-variable';

export function useSaveEnvVar(
  appName: string,
  envName: string,
  componentName: string
) {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  return usePatchJson<void, UpdatableEnvironmentVariableModel[]>(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`
  );
}
