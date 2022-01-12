import { useState } from 'react';

import { UsePollEnvVars } from './use-poll-env-vars';
import { EnvironmentVariableList } from './environment-variable-list';

import { ComponentType } from '../../models/component-type';
import { PoolingStateModel } from '../../models/pooling-state';

export interface EnvironmentVariablesProps {
  appName: string;
  envName: string;
  componentName: string;
  componentType?: ComponentType;
  includeRadixVars: boolean;
  readonly: boolean;
}

export const EnvironmentVariables = (props: EnvironmentVariablesProps) => {
  const [poolingState, setPoolingState] = useState<PoolingStateModel>({
    paused: false,
  });
  const [pollEnvVarsState] = UsePollEnvVars({
    appName: props.appName,
    envName: props.envName,
    componentName: props.componentName,
    poolingState: poolingState,
  });

  return (
    <EnvironmentVariableList
      appName={props.appName}
      envName={props.envName}
      componentName={props.componentName}
      componentType={props.componentType}
      includeRadixVars={props.includeRadixVars}
      setPoolingState={setPoolingState}
      envVars={pollEnvVarsState.data}
      poolEnvVarsError={pollEnvVarsState.error}
      readonly={props.readonly}
    />
  );
};
