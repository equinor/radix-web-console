import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Panel from '../panel';
import Toggler from '../toggler';
import FormField from '../form-field';
import Button from '../button';
import Spinner from '../spinner';
import Alert from '../alert';

import requestStates from '../../state/state-utils/request-states';

import useSaveMachineUser from './use-save-machine-user';

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
    <Panel>
      <Toggler summary="Machine user">
        <fieldset>
          <FormField
            help="Check this option if you intend to create an application
          that communicates with Radix API."
          >
            <input
              name="machineUser"
              type="checkbox"
              value={machineUser}
              checked={machineUser}
              onChange={(ev) => checkboxToggled(ev.target.checked)}
              disabled={saveState === requestStates.IN_PROGRESS}
            />
            Enable machine user
          </FormField>
          <div className="o-action-bar">
            {saveState.status === requestStates.IN_PROGRESS && (
              <Spinner>Saving…</Spinner>
            )}
            {saveState.status === requestStates.FAILURE && (
              <Alert type="danger">
                Failed to save machine user setting. {saveState.error}
              </Alert>
            )}
            <Button
              onClick={saveMachineUserSetting}
              btnType="danger"
              disabled={
                savedMachineUser === machineUser ||
                saveState.status === requestStates.IN_PROGRESS
              }
            >
              Save
            </Button>
          </div>
        </fieldset>
      </Toggler>
    </Panel>
  );
};

ChangeMachineUserForm.propTypes = {
  appName: PropTypes.string.isRequired,
  machineUser: PropTypes.bool.isRequired,
};

export default ChangeMachineUserForm;
