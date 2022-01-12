import { usePollingJson } from '../../effects';
import { EnvironmentVariableModel } from '../../models/environment-variable';
import { EnvironmentVariableNormaliser } from '../../models/environment-variable/normaliser';
import { PoolingStateModel } from '../../models/pooling-state';

export interface UsePollEnvVarsProps {
  appName: string;
  envName: string;
  componentName: string;
  poolingState: PoolingStateModel;
}

export const UsePollEnvVars = (props: UsePollEnvVarsProps) => {
  const encAppName = encodeURIComponent(props.appName);
  const encEnvName = encodeURIComponent(props.envName);
  const encComponentName = encodeURIComponent(props.componentName);

  const [result] = usePollingJson<Array<EnvironmentVariableModel>>(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`,
    props.poolingState.paused ? 0 : 8000
  );

  return [
    {
      ...result,
      data: result.data
        ? result.data.map((envVar) => EnvironmentVariableNormaliser(envVar))
        : null,
    },
  ];
};
