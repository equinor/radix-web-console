import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Alert from '../alert';

import requestStates from '../../state/state-utils/request-states';

import useSaveMachineUser from './use-save-machine-user';

import {
  Accordion,
  Button,
  Checkbox,
  CircularProgress,
} from '@equinor/eds-core-react';

export const ChangeMachineUserForm = (props) => {
  const { onMachineUserChange, appName } = props;
  const [savedMachineUser, setSavedMachineUser] = useState(props.machineUser);
  const [machineUser, setMachineUser] = useState(props.machineUser);
  const [saveState, saveFunc, resetSaveState] = useSaveMachineUser(
    props.appName
  );

  useEffect(() => {
    setMachineUser(props.machineUser);
  }, [props.machineUser]);

  useEffect(() => {
    if (saveState.status === requestStates.SUCCESS) {
      setSavedMachineUser(machineUser);
      onMachineUserChange(appName);
      resetSaveState();
    }
  }, [saveState, machineUser, appName, resetSaveState, onMachineUserChange]);

  const saveMachineUserSetting = () => {
    saveFunc(machineUser);
  };

  const checkboxToggled = (machineUser) => {
    setMachineUser(machineUser);
  };

  return (
    <Accordion.Item className="accordion__item">
      <Accordion.Header className="accordion__header body_short">
        Machine user
      </Accordion.Header>
      <Accordion.Panel className="accordion__panel">
        <div className="accordion__content">
          <p className="body_short">
            Check this option if you intend to create an application that
            communicates with Radix API.
          </p>
          <Checkbox
            className="checkbox"
            label="Enable machine user"
            name="machineUser"
            value={machineUser}
            checked={machineUser}
            onChange={(ev) => checkboxToggled(ev.target.checked)}
            disabled={saveState === requestStates.IN_PROGRESS}
          />
          <div className="o-action-bar">
            {saveState.status === requestStates.IN_PROGRESS && (
              <>
                <CircularProgress size="24" />
                <span className="progress">Saving…</span>
              </>
            )}
            {saveState.status === requestStates.FAILURE && (
              <Alert type="danger">
                Failed to save machine user setting. {saveState.error}
              </Alert>
            )}
            {saveState.status !== requestStates.IN_PROGRESS && (
              <Button
                onClick={saveMachineUserSetting}
                color="danger"
                disabled={
                  savedMachineUser === machineUser ||
                  saveState.status === requestStates.IN_PROGRESS
                }
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

ChangeMachineUserForm.propTypes = {
  appName: PropTypes.string.isRequired,
  machineUser: PropTypes.bool.isRequired,
};

export default ChangeMachineUserForm;
