import PropTypes from 'prop-types';
import React, { useState } from 'react';
import editableEnvironmentVariable from '../../models/environment-variable/editable-environment-variable';
import { Button, Icon, Input, Tooltip } from '@equinor/eds-core-react';
import { layers, save } from '@equinor/eds-icons';
import requestStates from '../../state/state-utils/request-states';

const EnvironmentVariable = (props) => {
  const { inEditMode, saveState } = props;
  const [envVar, setSavedEnvVar] = useState(props.envVar.currentValue);
  const handleSetEnvVarValue = (ev) => {
    ev.preventDefault();
    setSavedEnvVar(ev.target.value);
    // envVar.currentValue = ev.target.value;
  };

  function handleSave(p, envVar) {
    console.log(123);
    p.envVar.currentValue = envVar;
  }

  return (
    <div>
      <div className="form-field">
        <Input
          disabled={
            !inEditMode || saveState.status === requestStates.IN_PROGRESS
          }
          type="text"
          value={envVar.currentValue}
          onChange={handleSetEnvVarValue}
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
            handleSave(props, envVar);
          }}
        >
          <Icon data={save} />
          Apply
        </Button>
      </div>
    </div>
  );
};

EnvironmentVariable.propTypes = {
  envVar: PropTypes.shape(editableEnvironmentVariable).isRequired,
  inEditMode: PropTypes.bool,
  saveState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
};

export default EnvironmentVariable;
