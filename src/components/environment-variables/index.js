import React, { useState } from 'react';
import usePollEnvVars from './use-poll-env-vars';
import EnvironmentVariablesList from './environment-variables-list';
import componentType from '../../models/component-type';
import PropTypes from 'prop-types';

const EnvironmentVariables = (props) => {
  const {
    appName,
    envName,
    componentName,
    componentType,
    includeRadixVars,
    readonly,
  } = props;
  const [poolingState, setPoolingState] = useState({ paused: false });
  const [pollEnvVarsState] = usePollEnvVars(
    appName,
    envName,
    componentName,
    poolingState
  );
  return (
    <EnvironmentVariablesList
      appName={appName}
      envName={envName}
      componentName={componentName}
      componentType={componentType}
      includeRadixVars={includeRadixVars}
      setPoolingState={setPoolingState}
      envVars={pollEnvVarsState.data}
      poolEnvVarsError={pollEnvVarsState.error}
      readonly={readonly}
    />
  );
};

EnvironmentVariables.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  componentType: PropTypes.shape(componentType),
  includeRadixVars: PropTypes.bool.isRequired,
  readonly: PropTypes.bool.isRequired,
};

export default EnvironmentVariables;
