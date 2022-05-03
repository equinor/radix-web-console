import {
  Accordion,
  Button,
  Checkbox,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import useSaveMachineUser from './use-save-machine-user';

import { Alert } from '../alert';
import { RequestState } from '../../state/state-utils/request-states';

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
    if (saveState.status === RequestState.SUCCESS) {
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
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
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
              disabled={saveState === RequestState.IN_PROGRESS}
            />
            {saveState.status === RequestState.FAILURE && (
              <div>
                <Alert type="danger">
                  Failed to save machine user setting. {saveState.error}
                </Alert>
              </div>
            )}
            {saveState.status === RequestState.IN_PROGRESS ? (
              <div>
                <CircularProgress size={24} /> Saving…
              </div>
            ) : (
              <div>
                <Button
                  onClick={saveMachineUserSetting}
                  color="danger"
                  disabled={
                    savedMachineUser === machineUser ||
                    saveState.status === RequestState.IN_PROGRESS
                  }
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ChangeMachineUserForm.propTypes = {
  appName: PropTypes.string.isRequired,
  machineUser: PropTypes.bool.isRequired,
  onMachineUserChange: PropTypes.func.isRequired,
};

export default ChangeMachineUserForm;
