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

export function usePollEnvVars(props: UsePollEnvVarsProps) {
  const appName = encodeURIComponent(props.appName);
  const envName = encodeURIComponent(props.envName);
  const componentName = encodeURIComponent(props.componentName);

  const [result] = usePollingJson<Array<EnvironmentVariableModel>>(
    `/applications/${appName}/environments/${envName}/components/${componentName}/envvars`,
    props.poolingState.paused ? 0 : 8000
  );

  const stuff = [
    {
      ...result,
      data: result.data?.map((envVar) => EnvironmentVariableNormaliser(envVar)),
    },
  ];

  return stuff;
}
