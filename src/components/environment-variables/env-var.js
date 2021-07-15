import PropTypes from 'prop-types';
import React, { useState } from 'react';
import environmentVariable from '../../models/environment-variable';
import { Button, Icon, Table } from '@equinor/eds-core-react';
import { edit, layers, restore } from '@equinor/eds-icons';
import useSaveEnvVar from './use-save-env-var';

const EnvironmentVariable = (props) => {
  const { appName, envName, componentName, includeRadixVars, envVar } = props;
  const [savedEnvVar, setSavedEnvVar] = useState(props.envVar);
  const [saveState, saveFunc, resetState] = useSaveEnvVar(props.appName);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    saveFunc(envVar);
    setSavedEnvVar(envVar);
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
        <Table.Cell>
          <Button
            variant="ghost"
            color="primary"
            className="o-heading-page-button"
          >
            <Icon data={edit} />
            Edit
          </Button>
          {envVar.metadata != null &&
            envVar.metadata.radixConfigValue != envVar.value && (
              <Button
                variant="ghost"
                color="primary"
                className="o-heading-page-button"
              >
                <Icon data={restore} />
                Restore
              </Button>
            )}
        </Table.Cell>
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
