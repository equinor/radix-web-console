import React, { useState } from 'react';
import usePollEnvVars from './use-poll-env-vars';
import EnvironmentVariablesList from './environment-variables-list';

const EnvironmentVariables = (props) => {
  const { appName, envName, componentName, includeRadixVars } = props;
  const [context, setContext] = useState({ paused: false });
  const [pollEnvVarsState] = usePollEnvVars(
    appName,
    envName,
    componentName,
    context
  );
  return (
    <EnvironmentVariablesList
      appName={appName}
      envName={envName}
      componentName={componentName}
      includeRadixVars={includeRadixVars}
      setContext={setContext}
      envVars={pollEnvVarsState.data}
    />
  );
};

export default EnvironmentVariables;
