import React, { useEffect, useReducer, useState } from 'react';
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
  const handleSave = () => {
    const updatableEnvVars = getUpdatableEnvVars(editableEnvVars);
    if (updatableEnvVars.length > 0) {
      console.log('save env-vars: ' + updatableEnvVars.length);
      saveFunc({ appName, envName, componentName, updatableEnvVars });
    } else {
      console.log('nothing to change in env-vars');
    }
    setInEditMode(false);
    context.paused = false;
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
  function editableEnvVarsReducer(envVars, action) {
    return [...envVars, ([action.index].currentValue = action.value)];
  }

  const initialEditableEnvVars =
    pollEnvVarsState && pollEnvVarsState.data
      ? getEditableEnvVars(pollEnvVarsState.data)
      : [];
  const [editableEnvVars, setEditableEnvVars] = useReducer(
    editableEnvVarsReducer,
    initialEditableEnvVars
  );
  // useEffect(() => {
  //   setEditableEnvVars(setEditableEnvVars);
  // }, [initialEditableEnvVars]);
  const handleTest = (editableEnvVar) => {
    console.log(editableEnvVar);
  };
  function getEditableEnvVars(envVars) {
    console.log('populate editableEnvVars');
    let editableEnvVars = [];
    envVars.map((envVar) => {
      if (includeRadixVars || !envVar.isRadixVariable) {
        const editableEnvVar = {
          currentValue: envVar.value,
          origEnvVar: envVar,
        };
        editableEnvVars.push(editableEnvVar);
      }
    });
    return editableEnvVars;
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
              {console.log('draw')}
              {editableEnvVars &&
                editableEnvVars.map((editableEnvVar, index) => {
                  const envVar = editableEnvVar.origEnvVar;
                  hasRadixVars =
                    includeRadixVars &&
                    (hasRadixVars || envVar.isRadixVariable);
                  if (!envVar.isRadixVariable) {
                    return (
                      <Table.Row key={envVar.name}>
                        <Table.Cell>{envVar.name}</Table.Cell>
                        <Table.Cell>
                          {
                            <div>
                              <div className="form-field">
                                <Input
                                  id={'envVar' + envVar.name}
                                  disabled={
                                    !inEditMode ||
                                    saveState.status ===
                                      requestStates.IN_PROGRESS
                                  }
                                  type="text"
                                  value={editableEnvVar.currentValue}
                                  onChange={(ev) =>
                                    setEditableEnvVars({
                                      index: index,
                                      value: ev.target.value,
                                    })
                                  }
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
                                        title="Value in radixconfig.yaml"
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
