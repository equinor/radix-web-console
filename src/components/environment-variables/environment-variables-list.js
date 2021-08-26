import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Icon,
  Label,
  Table,
  Typography,
  Button,
  TextField,
} from '@equinor/eds-core-react';
import { ReactComponent as Logo } from '../component/radix-logo.svg';
import { edit, restore_page, save } from '@equinor/eds-icons';
import useSaveEnvVar from './use-save-env-var';
import requestStates from '../../state/state-utils/request-states';
import Alert from '../alert';
import './style.css';
import componentType from '../../models/component-type';
import environmentVariable from '../../models/environment-variable';
import PropTypes from 'prop-types';

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
    let edEnvVars = getEditableEnvVars(includeRadixVars, envVars);
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
      {poolEnvVarsError && (
        <div>
          <Alert type="danger">
            Failed to get environment variables. {poolEnvVarsError}
          </Alert>
        </div>
      )}
      {saveState && saveState.err && (
        <div>
          <Alert type="danger">
            Failed to save environment variables. {saveState.error}
          </Alert>
        </div>
      )}
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
      {includeRadixVars && editableEnvVars && editableEnvVars.length > 0 && (
        <div>
          <Typography variant="body_short">
            ( <Logo height="24px" width="24px" /> automatically added by Radix )
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
                    if (!envVar.isRadixVariable) {
                      return (
                        <Table.Row key={envVar.name}>
                          <Table.Cell className="env-var-name">
                            {envVar.name}
                          </Table.Cell>
                          <Table.Cell className="env-var-value">
                            {!inEditMode && (
                              <Label label={editableEnvVar.currentValue} />
                            )}
                            {inEditMode && (
                              <div className="form-field">
                                <TextField
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
                                  multiline
                                />
                              </div>
                            )}
                          </Table.Cell>
                          <Table.Cell className="env-var-value">
                            {envVar.metadata != null &&
                              envVar.metadata.radixConfigValue &&
                              envVar.metadata.radixConfigValue.length > 0 && (
                                <Label
                                  label={envVar.metadata.radixConfigValue}
                                />
                              )}
                          </Table.Cell>
                        </Table.Row>
                      );
                    }
                    if (includeRadixVars === true) {
                      return (
                        <Table.Row key={envVar.name}>
                          <Table.Cell>
                            <Logo height="24px" className="env-var-name" />{' '}
                            {envVar.name}
                          </Table.Cell>
                          <Table.Cell className="env-var-value">
                            <strong>{envVar.value}</strong>
                          </Table.Cell>
                          <Table.Cell className="env-var-value"> </Table.Cell>
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

  function checkHasNonRadixEnvVars(edEnvVars) {
    for (let i = 0; i < edEnvVars.length; i++) {
      if (edEnvVars[i].origEnvVar.isRadixVariable) {
        continue;
      }
      return true;
    }
    return false;
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
};

EnvironmentVariablesList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  componentType: PropTypes.shape(componentType),
  setPoolingState: PropTypes.func.isRequired,
  envVars: PropTypes.arrayOf(PropTypes.shape(environmentVariable)),
  poolEnvVarsError: PropTypes.string,
  includeRadixVars: PropTypes.bool.isRequired,
  readonly: PropTypes.bool.isRequired,
};

export default EnvironmentVariablesList;
