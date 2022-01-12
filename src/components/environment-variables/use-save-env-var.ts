import { usePatchJson } from '../../effects';
import { UpdateableEnvironmentVariableModel } from '../../models/environment-variable/updatable-environment-variable';

export interface UseSaveEnvVarProps {
  appName: string;
  envName: string;
  componentName: string;
}

export const UseSaveEnvVar = (props: UseSaveEnvVarProps) => {
  const encAppName = encodeURIComponent(props.appName);
  const encEnvName = encodeURIComponent(props.envName);
  const encComponentName = encodeURIComponent(props.componentName);

  return usePatchJson<UpdateableEnvironmentVariableModel>(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`
  );
};
