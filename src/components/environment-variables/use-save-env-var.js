import { usePatchJson } from '../../effects';

const useSaveEnvVar = (appName, envName, componentName, envVarName) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encEnvVarName = encodeURIComponent(envVarName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars/${envVarName}`;

  return usePatchJson(path, (newEnvVar) => {
    return { value: newEnvVar ? newEnvVar.toString() : null };
  });
};

export default useSaveEnvVar;
