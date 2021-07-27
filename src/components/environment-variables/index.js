import React, { useEffect, useReducer, useState } from 'react';
import { Icon, Input } from '@equinor/eds-core-react';
import Button from '../button';
import { edit, restore_page, save } from '@equinor/eds-icons';
import useSaveEnvVar from './use-save-env-var';
import usePollEnvVars from './use-poll-env-vars';
import requestStates from '../../state/state-utils/request-states';
import EnvironmentVariablesContent from './EnvironmentVariablesContent';

const EnvironmentVariables = (props) => {
  const { appName, envName, componentName, includeRadixVars, context } = props;
  const [pollEnvVarsState] = usePollEnvVars(
    appName,
    envName,
    componentName,
    context
  );
  const [inEditMode, setInEditMode] = useState(false);
  console.log('initttt. inEditMode: ' + inEditMode);
  let hasRadixVars = false;
  const updatableEnvVars = [];
  const [saveState, saveFunc, resetState] = useSaveEnvVar({
    appName,
    envName,
    componentName,
    updatableEnvVars,
  });
  console.log('init......');

  function envVars(includeRadixVars, pollEnvVarsState) {
    if (pollEnvVarsState && pollEnvVarsState.data) {
      let editableEnvVars1 = getEditableEnvVars(
        includeRadixVars,
        pollEnvVarsState.data
      );
      return editableEnvVars1;
    }
    return [];
  }
  let editableEnvVars2 = envVars(includeRadixVars, pollEnvVarsState);
  return (
    <EnvironmentVariablesContent
      appName={appName}
      envName={envName}
      componentName={componentName}
      includeRadixVars={true}
      context={context}
      originalEditableEnvVars={editableEnvVars2}
    ></EnvironmentVariablesContent>
  );
};

function getEditableEnvVars(includeRadixVars, envVars) {
  console.log('populate editableEnvVars');
  if (!envVars) {
    return [];
  }
  return envVars
    .filter((envVar) => includeRadixVars || !envVar.isRadixVariable)
    .map((envVar) => {
      return {
        currentValue: envVar.value,
        origEnvVar: envVar,
      };
    });
}

export default EnvironmentVariables;
