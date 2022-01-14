import { usePatchJson } from '../../effects';
import { UpdateableEnvironmentVariableModel } from '../../models/environment-variable/updatable-environment-variable';

export interface UseSaveEnvVarProps {
  appName: string;
  envName: string;
  componentName: string;
}

export function useSaveEnvVar(props: UseSaveEnvVarProps) {
  const appName = encodeURIComponent(props.appName);
  const envName = encodeURIComponent(props.envName);
  const componentName = encodeURIComponent(props.componentName);

  return usePatchJson<void, UpdateableEnvironmentVariableModel[]>(
    `/applications/${appName}/environments/${envName}/components/${componentName}/envvars`
  );
}
