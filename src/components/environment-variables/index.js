import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Icon,
  Input,
  Table,
  Tooltip,
} from '@equinor/eds-core-react';
import usePollEnvVars from './use-poll-env-vars';
import requestStates from '../../state/state-utils/request-states';
import useSaveEnvVar from './use-save-env-var';
import { edit, layers, restore_page, save } from '@equinor/eds-icons';
import Alert from '../alert';

const EnvironmentVariables = (props) => {
  const { appName, envName, componentName, includeRadixVars, context } = props;
  // const [pollEnvVarsState] = usePollEnvVars(
  //   appName,
  //   envName,
  //   componentName,
  //   context
  // );
  const [pollEnvVarsState] = usePollEnvVars(
    appName,
    envName,
    componentName,
    context
  );
  const updatableEnvVars = [];
  const [saveState, saveFunc, resetState] = useSaveEnvVar({
    appName,
    envName,
    componentName,
    updatableEnvVars,
  });
  const [inEditMode, setInEditMode] = useState(false);
  console.log('init. inEditMode: ' + inEditMode);
  let hasRadixVars = false;
  let editableEnvVars = getEditableEnvVars([
    { name: 'n1', value: 'val1' },
    { name: 'n2', value: 'val2' },
  ]);
  // const [editableEnvVars, setEditableEnvVars] = useState(editableEnvVars1);
  // let editableEnvVars = [];
  // if (pollEnvVarsState.data) {
  //   editableEnvVars = getEditableEnvVars(pollEnvVarsState.data);
  // }
  useEffect(() => {
    if (inEditMode && saveState.status === requestStates.SUCCESS) {
      setInEditMode(false);
      context.paused = false;
    }
  }, [context, inEditMode, saveState]);
  const handleSave = () => {
    const updatableEnvVars = getUpdatableEnvVars(editableEnvVars);
    if (updatableEnvVars.length > 0) {
      console.log('save env-vars: ' + updatableEnvVars.length);
      saveFunc({ appName, envName, componentName, updatableEnvVars });
    } else {
      console.log('nothing to change in env-vars');
    }
  };
  const handleSetEditMode = () => {
    context.paused = true;
    setInEditMode(true);
  };
  const handleReset = () => {
    console.log('reset env-vars');
    resetState();
    setInEditMode(false);
    context.paused = false;
  };
  const handleSetEnvVarValue = (ev, editableEnvVar) => {
    editableEnvVar.currentValue = ev.target.value;
    // editableEnvVars = (vars) =>
    //   vars.map((v) =>
    //     v.origEnvVar.name === name ? { ...v, currentValue: newValue } : v
    //   );
  };
  const handleTest = (editableEnvVar) => {
    console.log(editableEnvVar);
  };
  function getEditableEnvVars(envVars) {
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
  return (
    <React.Fragment>
      <h4>Environment variables</h4>
      {hasRadixVars && editableEnvVars != null && (
        <p className="body_short">(* automatically added by Radix)</p>
      )}
      {editableEnvVars && editableEnvVars.length === 0 && (
        <p>This component uses no environment variables</p>
      )}
      {editableEnvVars &&
        editableEnvVars.length > 0 &&
        !inEditMode &&
        (saveState.status === requestStates.IDLE ||
          saveState.status === requestStates.SUCCESS) && (
          <Button
            variant="ghost"
            color="primary"
            className="o-heading-page-button"
            onClick={() => {
              handleSetEditMode();
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
              {editableEnvVars &&
                editableEnvVars.map((editableEnvVar, index) => {
                  console.log('draw table');
                  let envVar = editableEnvVar.origEnvVar;
                  if (!envVar.isRadixVariable) {
                    let value = '' + editableEnvVar.currentValue;
                    return (
                      <Table.Row key={envVar.name}>
                        <Table.Cell>{envVar.name}</Table.Cell>
                        <Table.Cell>
                          {
                            <div>
                              <div className="form-field">
                                <Input
                                  id={'value_' + editableEnvVar.origEnvVar.name}
                                  name={
                                    'name_' + editableEnvVar.origEnvVar.name
                                  }
                                  disabled={
                                    !inEditMode ||
                                    saveState.status ===
                                      requestStates.IN_PROGRESS
                                  }
                                  type="text"
                                  value={editableEnvVar.currentValue}
                                  onChange={(ev) => {
                                    editableEnvVars[index].currentValue =
                                      ev.target.value;
                                    // handleSetEnvVarValue(ev, editableEnvVar)
                                    console.log(
                                      'editableEnvVar.currentValue, ev.target.value' +
                                        editableEnvVars[index].currentValue +
                                        '   ' +
                                        ev.target.value
                                    );
                                  }}
                                />
                              </div>
                              <div>
                                {envVar.metadata != null &&
                                  envVar.metadata.radixConfigValue != null &&
                                  envVar.metadata.radixConfigValue !== '' && (
                                    <span>
                                      <Tooltip
                                        enterDelay={0}
                                        placement="right"
                                        title="Value, defined in radixconfig.yaml"
                                      >
                                        <Icon data={layers} />
                                      </Tooltip>
                                      {envVar.metadata.radixConfigValue
                                        ? envVar.metadata.radixConfigValue
                                        : 'NOT SET'}
                                    </span>
                                  )}
                                <Button
                                  variant="ghost"
                                  color="primary"
                                  className="o-heading-page-button"
                                  onClick={() => {
                                    handleTest(editableEnvVar);
                                  }}
                                >
                                  <Icon data={save} />
                                  Test
                                </Button>
                              </div>
                            </div>
                          }
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
              )}
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
      {editableEnvVars &&
        editableEnvVars.length > 0 &&
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
    </React.Fragment>
  );
};

function getUpdatableEnvVars(editableEnvVars) {
  const updatableEnvVars = [];
  for (let i = 0; i < editableEnvVars.length; i++) {
    let editableEnvVar = editableEnvVars[i];
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
