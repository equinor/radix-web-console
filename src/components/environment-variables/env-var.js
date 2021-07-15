import PropTypes from 'prop-types';
import React, { useState } from 'react';
import environmentVariable from '../../models/environment-variable';
import {
  Button,
  CircularProgress,
  Icon,
  Input,
  Table,
} from '@equinor/eds-core-react';
import { edit, layers, restore } from '@equinor/eds-icons';
import useSaveEnvVar from './use-save-env-var';
import requestStates from '../../state/state-utils/request-states';
import Alert from '../alert';

const EnvironmentVariable = (props) => {
  const { appName, envName, componentName, includeRadixVars, envVar } = props;
  const [envVarValue, setEnvVarValue] = useState(props.envVar.value);
  const [savedEnvVarValue, setSavedEnvVar] = useState(props.envVar);
  const [saveState, saveFunc, resetState] = useSaveEnvVar(
    appName,
    envName,
    componentName,
    envVar.name
  );
  const handleSubmit = (ev) => {
    ev.preventDefault();
    saveFunc(envVar);
    setSavedEnvVar(envVar);
  };
  const setEnvVarAndResetSaveState = (varValue) => {
    if (saveState.status !== requestStates.IDLE) {
      resetState();
    }
    setEnvVarValue(varValue);
  };

  let hasRadixVars = false;
  if (!envVar.isRadixVariable) {
    return (
      <Table.Row key={envVar.name}>
        <Table.Cell>{envVar.name}</Table.Cell>
        <Table.Cell>
          {envVar.metadata == null && envVar.value}
          {envVar.metadata != null && (
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {envVar.metadata != null && <Icon data={layers} />}
                    <strong>{envVar.value}</strong>
                    <form onSubmit={handleSubmit}>
                      {saveState.status === requestStates.FAILURE && (
                        <Alert type="danger" className="gap-bottom">
                          Failed to change environment variable.
                          {saveState.error}
                        </Alert>
                      )}
                      <Input
                        disabled={
                          saveState.status === requestStates.IN_PROGRESS
                        }
                        type="text"
                        value={envVarValue}
                        onChange={(ev) =>
                          setEnvVarAndResetSaveState(ev.target.value)
                        }
                      />
                      <div className="o-action-bar">
                        {saveState.status === requestStates.IN_PROGRESS && (
                          <>
                            <CircularProgress size="24" />
                            <span className="progress">Updating…</span>
                          </>
                        )}
                        {saveState.status !== requestStates.IN_PROGRESS && (
                          <Button
                            variant="ghost"
                            color="primary"
                            className="o-heading-page-button"
                            type="submit"
                            disabled={savedEnvVarValue === envVarValue}
                          >
                            <Icon data={edit} />
                            Edit
                          </Button>
                        )}
                      </div>
                    </form>
                  </Table.Cell>
                </Table.Row>
                {envVar.metadata != null &&
                  envVar.metadata.radixConfigValue != null &&
                  envVar.metadata.radixConfigValue !== '' && (
                    <Table.Row>
                      <Table.Cell>
                        {envVar.metadata.radixConfigValue}
                      </Table.Cell>
                    </Table.Row>
                  )}
              </Table.Body>
            </Table>
          )}
        </Table.Cell>
        <Table.Cell></Table.Cell>
      </Table.Row>
    );
  } else if (includeRadixVars === true) {
    return (
      <Table.Row key={envVar.name}>
        <Table.Cell>
          * {envVar.name} <strong>{envVar.value}</strong>
        </Table.Cell>
      </Table.Row>
    );
  } else {
    return '';
  }
};

EnvironmentVariable.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  includeRadixVars: PropTypes.bool.isRequired,
  envVar: PropTypes.shape(environmentVariable),
};

export default EnvironmentVariable;
