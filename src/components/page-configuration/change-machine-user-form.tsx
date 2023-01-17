import {
  Accordion,
  Button,
  Checkbox,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useSaveMachineUser } from './use-save-machine-user';

import { Alert } from '../alert';
import { RequestState } from '../../state/state-utils/request-states';

export interface ChangeMachineUserFormProps {
  appName: string;
  machineUser: boolean;
  onMachineUserChange: (appName: string) => void;
}

export const ChangeMachineUserForm = ({
  appName,
  machineUser,
  onMachineUserChange,
}: ChangeMachineUserFormProps): JSX.Element => {
  const [saveState, saveFunc, resetSaveState] = useSaveMachineUser(appName);
  const [machineUserState, setMachineUserState] = useState(machineUser);
  const [savedMachineUserState, setSavedMachineUserState] =
    useState(machineUser);

  useEffect(() => {
    setMachineUserState(machineUser);
  }, [machineUser]);

  useEffect(() => {
    if (saveState.status === RequestState.SUCCESS) {
      setSavedMachineUserState(machineUserState);
      onMachineUserChange(appName);
      resetSaveState();
    }
  }, [
    appName,
    machineUserState,
    saveState.status,
    resetSaveState,
    onMachineUserChange,
  ]);

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Machine user (deprecated)</Typography>
          </Accordion.HeaderTitle>
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
              checked={machineUserState}
              onChange={({ target: { checked } }) => {
                setMachineUserState(checked);
              }}
              disabled={
                saveState.status === RequestState.IN_PROGRESS ||
                !machineUserState
              }
            />
            <div>
              {saveState.status === RequestState.FAILURE ? (
                <Alert type="danger">
                  Failed to save machine user setting. {saveState.error}
                </Alert>
              ) : saveState.status === RequestState.IN_PROGRESS ? (
                <>
                  <CircularProgress size={24} /> Saving…
                </>
              ) : (
                <Button
                  onClick={() => saveFunc(machineUserState)}
                  color="danger"
                  disabled={savedMachineUserState === machineUserState}
                >
                  Save
                </Button>
              )}
            </div>
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
} as PropTypes.ValidationMap<ChangeMachineUserFormProps>;
