import {
  Button,
  CircularProgress,
  Icon,
  Table,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { edit, restore_page, save } from '@equinor/eds-icons';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useSaveEnvVar from './use-save-env-var';

import Alert from '../alert';
import componentType from '../../models/component-type';
import environmentVariable from '../../models/environment-variable';
import requestStates from '../../state/state-utils/request-states';

import './style.css';
import HomeIcon from '../home-icon';

const EnvironmentVariablesList = (props) => {
  const {
    appName,
    envName,
    componentName,
    componentType,
    includeRadixVars,
    setPoolingState,
    envVars,
    poolEnvVarsError,
    readonly,
  } = props;

  const [inEditMode, setInEditMode] = useState(false);
  const [saveState, saveFunc, resetState] = useSaveEnvVar({
    appName,
    envName,
    componentName,
  });
  const [editableEnvVars, setEditableEnvVars] = useState([]);
  const [hasNonRadixEnvVars, setHasNonRadixEnvVars] = useState(false);

  useEffect(() => {
    if (inEditMode) {
      return;
    }

    const edEnvVars = getEditableEnvVars(includeRadixVars, envVars);
    setHasNonRadixEnvVars(checkHasNonRadixEnvVars(edEnvVars));
    setEditableEnvVars(edEnvVars);
  }, [includeRadixVars, inEditMode, envVars]);

  const handleSetEditMode = () => {
    setPoolingState({ paused: true });
    setInEditMode(true);
  };

  const handleSave = () => {
    if (readonly) {
      return;
    }

    const updatableEnvVars = getUpdatableEnvVars(editableEnvVars);
    if (updatableEnvVars.length > 0) {
      saveFunc(updatableEnvVars);
    }
    setInEditMode(false);
    setPoolingState({ paused: false });
  };

  const handleReset = () => {
    resetState();
    setInEditMode(false);
    setPoolingState({ paused: false });
  };

  return (
    <>
      <div className="section__heading_with_buttons grid grid--gap-medium">
        <Typography variant="h4">Environment variables</Typography>
        {editableEnvVars?.length > 0 &&
          !readonly &&
          hasNonRadixEnvVars &&
          (saveState.status === requestStates.IDLE ||
            saveState.status === requestStates.SUCCESS) && (
            <>
              {inEditMode ? (
                <div className="horizontal-buttons">
                  <Button variant="contained" onClick={() => handleSave()}>
                    <Icon data={save} /> Apply
                  </Button>
                  <Button variant="outlined" onClick={() => handleReset()}>
                    <Icon data={restore_page} /> Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <Button onClick={() => handleSetEditMode()}>
                    <Icon data={edit} /> Edit
                  </Button>
                </div>
              )}
            </>
          )}
      </div>

      {poolEnvVarsError && (
        <div>
          <Alert type="danger">
            Failed to get environment variables. {poolEnvVarsError}
          </Alert>
        </div>
      )}

      {saveState?.error && (
        <div>
          <Alert type="danger">
            Failed to save environment variables. {saveState.error}
          </Alert>
        </div>
      )}

      {editableEnvVars?.length > 0 && !readonly && inEditMode && (
        <>
          {componentType === 'job' ? (
            <Typography>
              Applied changes will be used for new started jobs
            </Typography>
          ) : (
            <Typography>
              Component need to be restarted after applied changes
            </Typography>
          )}
        </>
      )}

      {editableEnvVars && !hasNonRadixEnvVars && (
        <Typography>
          This {componentType} uses no environment variables.
        </Typography>
      )}

      {editableEnvVars?.length > 0 && includeRadixVars && (
        <Typography className="env-var-radix-logo">
          (<HomeIcon /> automatically added by Radix )
        </Typography>
      )}

      {editableEnvVars?.length > 0 && (
        <form className="env-vars-list">
          {saveState.status === requestStates.FAILURE && (
            <Alert type="danger" className="gap-bottom">
              Failed to change environment variable. {saveState.error}
            </Alert>
          )}

          <div className="env-vars-table grid grid--table-overflow">
            <Table>
              <Table.Head className="env-vars-table-header">
                <Table.Row>
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>Value</Table.Cell>
                  <Table.Cell>Original</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {editableEnvVars &&
                  editableEnvVars.map((editableEnvVar, index) => {
                    const envVar = editableEnvVar.origEnvVar;
                    if (envVar.isRadixVariable && !includeRadixVars) {
                      return null;
                    }

                    return envVar.isRadixVariable ? (
                      <Table.Row key={envVar.name}>
                        <Table.Cell className="env-var-name env-var-radix-logo">
                          <HomeIcon /> {envVar.name}
                        </Table.Cell>
                        <Table.Cell className="env-var-value">
                          <Typography>{envVar.value}</Typography>
                        </Table.Cell>
                        <Table.Cell className="env-var-value" />
                      </Table.Row>
                    ) : (
                      <Table.Row key={envVar.name}>
                        <Table.Cell className="env-var-name">
                          {envVar.name}
                        </Table.Cell>
                        <Table.Cell className="env-var-value">
                          {!inEditMode ? (
                            <Typography>
                              {editableEnvVar.currentValue}
                            </Typography>
                          ) : (
                            <div className="form-field">
                              <TextField
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
                                multiline
                              />
                            </div>
                          )}
                        </Table.Cell>
                        <Table.Cell className="env-var-value">
                          {envVar.metadata?.radixConfigValue?.length > 0 && (
                            <Typography>
                              {envVar.metadata.radixConfigValue}
                            </Typography>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>

            {saveState.status === requestStates.IN_PROGRESS && (
              <>
                <CircularProgress size="24" /> Updating…
              </>
            )}
          </div>
        </form>
      )}
    </>
  );

  function checkHasNonRadixEnvVars(edEnvVars) {
    for (let i = 0; i < edEnvVars.length; i++) {
      if (!edEnvVars[i].origEnvVar.isRadixVariable) {
        return true;
      }
    }
    return false;
  }

  function getUpdatableEnvVars(editableEnvVars) {
    return editableEnvVars
      .filter(
        (editableEnvVar) =>
          editableEnvVar.currentValue !== editableEnvVar.origEnvVar.value
      )
      .map((editableEnvVar) => ({
        name: editableEnvVar.origEnvVar.name,
        value: editableEnvVar.currentValue,
      }));
  }

  function getEditableEnvVars(includeRadixVars, envVars) {
    return envVars?.length > 0
      ? envVars
          .filter((envVar) => includeRadixVars || !envVar.isRadixVariable)
          .map((envVar) => ({ currentValue: envVar.value, origEnvVar: envVar }))
      : [];
  }
};

EnvironmentVariablesList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  componentType: componentType,
  setPoolingState: PropTypes.func.isRequired,
  envVars: PropTypes.arrayOf(PropTypes.shape(environmentVariable)),
  poolEnvVarsError: PropTypes.string,
  includeRadixVars: PropTypes.bool.isRequired,
  readonly: PropTypes.bool.isRequired,
};

export default EnvironmentVariablesList;
