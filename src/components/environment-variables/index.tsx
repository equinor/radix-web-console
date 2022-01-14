import * as PropTypes from 'prop-types';
import { useState } from 'react';

import { usePollEnvVars } from './use-poll-env-vars';
import { EnvironmentVariableList } from './environment-variable-list';

import { ComponentType } from '../../models/component-type';
import { PoolingStateModel } from '../../models/pooling-state';

export interface EnvironmentVariablesProps {
  appName: string;
  envName: string;
  componentName: string;
  componentType: ComponentType;
  hideRadixVars?: boolean;
  readonly?: boolean;
}

export const EnvironmentVariables = (
  props: EnvironmentVariablesProps
): JSX.Element => {
  const [poolingState, setPoolingState] = useState<PoolingStateModel>({
    paused: false,
  });
  const [pollEnvVarsState] = usePollEnvVars(
    props.appName,
    props.envName,
    props.componentName,
    poolingState
  );

  return (
    <EnvironmentVariableList
      appName={props.appName}
      envName={props.envName}
      componentName={props.componentName}
      componentType={props.componentType}
      envVars={pollEnvVarsState.data || []}
      setPoolingState={setPoolingState}
      poolStateError={pollEnvVarsState.error}
      hideRadixVars={props.hideRadixVars}
      readonly={props.readonly}
    />
  );
};

EnvironmentVariables.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  componentType: PropTypes.oneOf(Object.keys(ComponentType)).isRequired,
  hideRadixVars: PropTypes.bool,
  readonly: PropTypes.bool,
};
