import React, { useEffect, useState } from 'react';
import {
  Tooltip,
  Button,
  CircularProgress,
  Icon,
  Input,
  Table,
  Label,
} from '@equinor/eds-core-react';
import usePollEnvVars from './use-poll-env-vars';
import AsyncResource from '../async-resource/simple-async-resource';
import requestStates from '../../state/state-utils/request-states';
import useSaveEnvVar from './use-save-env-var';
import { edit, layers, restore, save, restore_page } from '@equinor/eds-icons';
import Alert from '../alert';

const EnvironmentVariables = (props) => {
  const { appName, envName, componentName, includeRadixVars } = props;
  const [pollEnvVarsState] = usePollEnvVars(appName, envName, componentName);
  const envVars = pollEnvVarsState.data;
  const updatableEnvVars = [];
  const [saveState, saveFunc, resetState] = useSaveEnvVar({
    appName,
    envName,
    componentName,
    updatableEnvVars,
  });
  const [inEditMode, setInEditMode] = useState(false);
  const handleSetEnvVarValue = (ev) => {
    ev.preventDefault();
  };
  const editableEnvVars = [];
  const handleSave = () => {
    const updatableEnvVars = getUpdatableEnvVars(editableEnvVars);
    if (updatableEnvVars.length > 0) {
      saveFunc({ appName, envName, componentName, updatableEnvVars });
    }
    setInEditMode(false);
  };
  const handleReset = () => {
    resetState();
    setInEditMode(false);
  };
  let hasRadixVars = false;
  return (
    <React.Fragment>
      <AsyncResource asyncState={pollEnvVarsState}>
        <h4>Environment variables</h4>
        {hasRadixVars && envVars != null && (
          <p className="body_short">(* automatically added by Radix)</p>
        )}
        {envVars && envVars.length === 0 && (
          <p>This component uses no environment variables</p>
        )}
        {envVars &&
          envVars.length > 0 &&
          !inEditMode &&
          (saveState.status === requestStates.IDLE ||
            saveState.status === requestStates.SUCCESS) && (
            <Button
              variant="ghost"
              color="primary"
              className="o-heading-page-button"
              onClick={() => {
                setInEditMode(true);
                console.log('123');
              }}
            >
              <Icon data={edit} />
              Edit
            </Button>
          )}
        <form>
          {saveState.status === requestStates.FAILURE && (
            <Alert type="danger" className="gap-bottom">
              Failed to change environment variable.
              {saveState.error}
            </Alert>
          )}
          <div className="o-action-bar">
            <Table className="variables_table">
              <Table.Body>
                {envVars &&
                  envVars.map((envVar) => {
                    hasRadixVars =
                      includeRadixVars &&
                      (hasRadixVars || envVar.isRadixVariable);
                    const editableEnvVar = {
                      currentValue: envVar.value,
                      origEnvVar: envVar,
                    };
                    editableEnvVars.push(editableEnvVar);
                    if (!envVar.isRadixVariable) {
                      return (
                        <Table.Row key={envVar.name}>
                          <Table.Cell>{envVar.name}</Table.Cell>
                          <Table.Cell>
                            <div className="form-field">
                              <Input
                                disabled={
                                  !inEditMode ||
                                  saveState.status === requestStates.IN_PROGRESS
                                }
                                type="text"
                                value={editableEnvVar.currentValue}
                                // OnChange={handleSetEnvVarValue}
                              ></Input>
                            </div>
                            <div>
                              {envVar.metadata != null &&
                                envVar.metadata.radixConfigValue != null &&
                                envVar.metadata.radixConfigValue !== '' && (
                                  <span>
                                    {envVar.metadata != null && (
                                      <Tooltip
                                        enterDelay={0}
                                        placement="right"
                                        title="Value in radixconfig.yaml"
                                      >
                                        <Icon data={layers} />
                                      </Tooltip>
                                    )}
                                    {envVar.metadata.radixConfigValue
                                      ? envVar.metadata.radixConfigValue
                                      : 'NOT SET'}
                                  </span>
                                )}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      );
                    } else if (includeRadixVars === true) {
                      return (
                        <Table.Row key={envVar.name}>
                          <Table.Cell>* {envVar.name}</Table.Cell>
                          <Table.Cell>
                            <strong>{envVar.value}</strong>
                          </Table.Cell>
                        </Table.Row>
                      );
                    } else {
                      return '';
                    }
                  })}
              </Table.Body>
            </Table>
            {saveState.status === requestStates.IN_PROGRESS && (
              <>
                <CircularProgress size="24" />
                <span className="progress">Updating…</span>
              </>
            )}
          </div>
        </form>
        {envVars &&
          envVars.length > 0 &&
          inEditMode &&
          (saveState.status === requestStates.IDLE ||
            saveState.status === requestStates.SUCCESS) && (
            <div>
              <Button
                variant="ghost"
                color="primary"
                className="o-heading-page-button"
                onClick={() => {
                  handleSave();
                }}
              >
                <Icon data={save} />
                Apply
              </Button>
              <Button
                variant="ghost"
                color="primary"
                className="o-heading-page-button"
                onClick={() => {
                  handleReset();
                }}
              >
                <Icon data={restore_page} />
                Cancel
              </Button>
            </div>
          )}
      </AsyncResource>
    </React.Fragment>
  );
};

function getUpdatableEnvVars(editableEnvVars) {
  const updatableEnvVars = [];
  for (const index in editableEnvVars) {
    let editableEnvVar = editableEnvVars[index];
    if (editableEnvVar.currentValue !== editableEnvVar.origEnvVar.value) {
      updatableEnvVars.push({
        name: editableEnvVar.name,
        value: editableEnvVar.currentValue,
      });
    }
  }
  return updatableEnvVars;
}

export default EnvironmentVariables;
