import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Icon,
  Input,
  Table,
  Tooltip,
} from '@equinor/eds-core-react';
import Button from '../button';
import { edit, layers, restore_page, save } from '@equinor/eds-icons';
import useSaveEnvVar from './use-save-env-var';
import requestStates from '../../state/state-utils/request-states';
import Alert from '../alert';
import './style.css';

const EnvironmentVariablesList = (props) => {
  const {
    appName,
    envName,
    componentName,
    includeRadixVars,
    setContext,
    envVars,
  } = props;
  const [inEditMode, setInEditMode] = useState(false);
  const updatableEnvVars = [];
  const [saveState, saveFunc, resetState] = useSaveEnvVar({
    appName,
    envName,
    componentName,
    updatableEnvVars,
  });
  const [editableEnvVars, setEditableEnvVars] = useState([]);
  useEffect(() => {
    if (inEditMode) {
      return;
    }
    setEditableEnvVars(getEditableEnvVars(includeRadixVars, envVars));
  }, [includeRadixVars, inEditMode, envVars]);

  const handleSetEditMode = () => {
    setContext({ paused: true });
    setInEditMode(true);
  };
  const handleSave = () => {
    const updatableEnvVars = getUpdatableEnvVars(editableEnvVars);
    if (updatableEnvVars.length > 0) {
      saveFunc({ appName, envName, componentName, updatableEnvVars });
    }
    setInEditMode(false);
    setContext({ paused: false });
  };
  const handleReset = () => {
    resetState();
    setInEditMode(false);
    setContext({ paused: false });
  };

  function getOriginalEnvVarToolTip(envVar) {
    if (!envVar.metadata) {
      return '';
    }
    const mainMessage = 'Variable exists in radixconfig.yaml';
    const radixConfigValueIsEmpty =
      envVar.metadata.radixConfigValue == null ||
      envVar.metadata.radixConfigValue.length === 0;
    return mainMessage + radixConfigValueIsEmpty
      ? ', but its value is empty'
      : ' with this value';
  }
  function getUpdatableEnvVars(editableEnvVars) {
    return editableEnvVars
      .filter(
        (editableEnvVar) =>
          editableEnvVar.currentValue !== editableEnvVar.origEnvVar.value
      )
      .map((editableEnvVar) => {
        return {
          name: editableEnvVar.origEnvVar.name,
          value: editableEnvVar.currentValue,
        };
      });
  }
  function getEditableEnvVars(includeRadixVars, envVars) {
    if (!envVars || envVars.length === 0) {
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
      <div className="section__heading">
        <div>
          <h4>Environment variables</h4>
        </div>
        {editableEnvVars &&
          editableEnvVars.length > 0 &&
          !inEditMode &&
          (saveState.status === requestStates.IDLE ||
            saveState.status === requestStates.SUCCESS) && (
            <div>
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
            </div>
          )}
      </div>
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
                {editableEnvVars &&
                  editableEnvVars.map((editableEnvVar, index) => {
                    const envVar = editableEnvVar.origEnvVar;
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
                                      setEditableEnvVars(() => {
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
                    }
                    if (includeRadixVars === true) {
                      return (
                        <Table.Row key={envVar.name}>
                          <Table.Cell>* {envVar.name}</Table.Cell>
                          <Table.Cell>
                            <strong>{envVar.value}</strong>
                          </Table.Cell>
                        </Table.Row>
                      );
                    }
                    return '';
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

export default EnvironmentVariablesList;
