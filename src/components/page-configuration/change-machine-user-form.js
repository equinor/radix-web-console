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
  Typography,
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
    <Accordion.Item className="accordion">
      <Accordion.Header>
        <Typography>Machine user</Typography>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="grid grid--gap-medium">
          <Typography>
            Check this option if you intend to create an application that
            communicates with Radix API.
          </Typography>
          <Checkbox
            label="Enable machine user"
            name="machineUser"
            value={machineUser}
            checked={machineUser}
            onChange={(ev) => checkboxToggled(ev.target.checked)}
            disabled={saveState === requestStates.IN_PROGRESS}
          />
          {saveState.status === requestStates.IN_PROGRESS && (
            <div>
              <CircularProgress size="20" /> <span>Saving…</span>
            </div>
          )}
          {saveState.status === requestStates.FAILURE && (
            <div>
              <Alert type="danger">
                Failed to save machine user setting. {saveState.error}
              </Alert>
            </div>
          )}
          {saveState.status !== requestStates.IN_PROGRESS && (
            <div>
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
            </div>
          )}
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
