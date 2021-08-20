import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Icon,
  Input,
  Label,
  Table,
  Tooltip,
  Typography,
  Button,
} from '@equinor/eds-core-react';
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
    componentType,
    includeRadixVars,
    setContext,
    envVars,
    readonly,
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
  const [hasNonRadixEnvVars, setHasNonRadixEnvVars] = useState(false);

  function checkHasNonRadixEnvVars(edEnvVars) {
    for (let i = 0; i < edEnvVars.length; i++) {
      if (edEnvVars[i].origEnvVar.isRadixVariable) {
        continue;
      }
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (inEditMode) {
      return;
    }
    let edEnvVars = getEditableEnvVars(includeRadixVars, envVars);
    setHasNonRadixEnvVars(checkHasNonRadixEnvVars(edEnvVars));
    setEditableEnvVars(edEnvVars);
  }, [includeRadixVars, inEditMode, envVars]);
  const handleSetEditMode = () => {
    setContext({ paused: true });
    setInEditMode(true);
  };
  const handleSave = () => {
    if (readonly) {
      return;
    }
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
    return envVar.metadata.radixConfigValue == null ||
      envVar.metadata.radixConfigValue.length === 0
      ? 'Empty variable, defined in radixconfig.yaml, is set by value below'
      : 'This value of variable, defined in radixconfig.yaml, is overridden by value below';
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
      <div className="section__heading_with_buttons grid grid--gap-medium">
        <Typography variant="h4">Environment variables</Typography>
        {editableEnvVars &&
          editableEnvVars.length > 0 &&
          hasNonRadixEnvVars &&
          !readonly &&
          !inEditMode &&
          (saveState.status === requestStates.IDLE ||
            saveState.status === requestStates.SUCCESS) && (
            <Button
              onClick={() => {
                handleSetEditMode();
              }}
            >
              <Icon data={edit} />
              Edit
            </Button>
          )}
        {editableEnvVars &&
          editableEnvVars.length > 0 &&
          !readonly &&
          inEditMode &&
          (saveState.status === requestStates.IDLE ||
            saveState.status === requestStates.SUCCESS) && (
            <div className="horizontal-buttons grid grid--gap-medium">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSave();
                }}
              >
                <Icon data={save} />
                Apply
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleReset();
                }}
              >
                <Icon data={restore_page} />
                Cancel
              </Button>
            </div>
          )}
      </div>
      {editableEnvVars &&
        editableEnvVars.length > 0 &&
        !readonly &&
        inEditMode && (
          <div>
            {componentType === 'component' && (
              <Typography variant="body_short">
                Component need to be restarted after applied changes
              </Typography>
            )}
            {componentType === 'job' && (
              <Typography variant="body_short">
                Applied changes will be used for new started jobs
              </Typography>
            )}
          </div>
        )}
      {editableEnvVars && !hasNonRadixEnvVars && (
        <div>
          <Typography variant="body_short">
            This {componentType === 'job' ? 'job' : 'component'} uses no
            environment variables.
          </Typography>
        </div>
      )}
      {editableEnvVars && editableEnvVars.length > 0 && (
        <div>
          <Typography variant="body_short">
            (* automatically added by Radix)
          </Typography>
        </div>
      )}
      {editableEnvVars && editableEnvVars.length > 0 && (
        <form className="env-vars-list">
          {saveState.status === requestStates.FAILURE && (
            <Alert type="danger" className="gap-bottom">
              Failed to change environment variable.
              {saveState.error}
            </Alert>
          )}
          <div className="grid grid--table-overflow">
            <Table className="o-table">
              <Table.Body>
                {editableEnvVars &&
                  editableEnvVars.map((editableEnvVar, index) => {
                    const envVar = editableEnvVar.origEnvVar;
                    if (!envVar.isRadixVariable) {
                      return (
                        <Table.Row key={envVar.name}>
                          <Table.Cell>{envVar.name}</Table.Cell>
                          <Table.Cell>
                            {envVar.metadata != null && (
                              <div className="icon-with-label">
                                <Tooltip
                                  enterDelay={0}
                                  placement="right"
                                  title={getOriginalEnvVarToolTip(envVar)}
                                >
                                  <Icon data={layers} />
                                </Tooltip>
                                {envVar.metadata.radixConfigValue &&
                                  envVar.metadata.radixConfigValue.length >
                                    0 && (
                                    <Tooltip
                                      enterDelay={0}
                                      placement="right"
                                      title={getOriginalEnvVarToolTip(envVar)}
                                    >
                                      <Label
                                        label={envVar.metadata.radixConfigValue}
                                      />
                                    </Tooltip>
                                  )}
                              </div>
                            )}
                            <div className="form-field">
                              <Input
                                id={'envVar' + envVar.name}
                                disabled={
                                  !inEditMode ||
                                  saveState.status === requestStates.IN_PROGRESS
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
    </React.Fragment>
  );
};

export default EnvironmentVariablesList;
