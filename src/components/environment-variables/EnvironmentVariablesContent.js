import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Icon,
  Input,
  Label,
  Table,
  Tooltip,
} from '@equinor/eds-core-react';
import Button from '../button';
import { edit, layers, restore_page, save } from '@equinor/eds-icons';
import useSaveEnvVar from './use-save-env-var';
import usePollEnvVars from './use-poll-env-vars';
import requestStates from '../../state/state-utils/request-states';
import Alert from '../alert';

const EnvironmentVariablesContent = (props) => {
  const {
    appName,
    envName,
    componentName,
    includeRadixVars,
    context,
    originalEditableEnvVars,
  } = props;
  const [pollEnvVarsState] = usePollEnvVars(
    appName,
    envName,
    componentName,
    context
  );
  const [inEditMode, setInEditMode] = useState(false);
  let hasRadixVars = false;
  const updatableEnvVars = [];
  const [saveState, saveFunc, resetState] = useSaveEnvVar({
    appName,
    envName,
    componentName,
    updatableEnvVars,
  });
  const [editableEnvVars, setEditableEnvVars] = useState();
  //TODO remove debug code
  const handleTest = (editableEnvVar) => {
    console.log(editableEnvVar[0]);
  };
  useEffect(() => {
    if (!inEditMode) {
      setEditableEnvVars(originalEditableEnvVars);
    }
  }, [originalEditableEnvVars, inEditMode]);
  const handleSetEditMode = () => {
    context.paused = true;
    setInEditMode(true);
  };
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
  const handleReset = () => {
    console.log('reset env-vars');
    resetState();
    setInEditMode(false);
    context.paused = false;
  };

  function getOriginalEnvVarToolTip(envVar) {
    if (!envVar.metadata) {
      return '';
    }
    return envVar.metadata.radixConfigValue == null ||
      envVar.metadata.radixConfigValue.length == 0
      ? 'Variable exists in radixconfig.yaml, but its value is empty'
      : 'Variable exists in radixconfig.yaml with this value';
  }

  return (
    <React.Fragment>
      <h4>Environment variables</h4>
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
      {editableEnvVars && editableEnvVars.length > 0 && (
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
                                      setEditableEnvVars((prevState) => {
                                        editableEnvVars[index].currentValue =
                                          ev.target.value;
                                        return [...editableEnvVars];
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  {envVar.metadata != null && (
                                    <span>
                                      <Tooltip
                                        enterDelay={0}
                                        placement="right"
                                        title={getOriginalEnvVarToolTip(envVar)}
                                      >
                                        <Icon data={layers} />
                                      </Tooltip>
                                      {envVar.metadata.radixConfigValue
                                        ? envVar.metadata.radixConfigValue
                                        : 'EMPTY'}
                                    </span>
                                  )}
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
      )}
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
        name: editableEnvVar.origEnvVar.name,
        value: editableEnvVar.currentValue,
      });
    }
  }
  return updatableEnvVars;
}

export default EnvironmentVariablesContent;
