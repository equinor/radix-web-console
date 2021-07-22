import { usePollingJson } from '../../effects';
import envVarsNormaliser from '../../models/environment-variable/normaliser';

const usePollEnvVars = (appName, envName, componentName, context) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  const path = `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`;
  const [result, poll, context] = usePollingJson(
    path,
    context.paused === true ? 0 : 8000
  );

  return [
    {
      ...result,
      data: result.data
        ? result.data.map((envVar) => envVarsNormaliser(envVar))
        : null,
    },
  ];
};

export default usePollEnvVars;
