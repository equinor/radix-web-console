import {
  Accordion,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { usePatchApplicationRegistration } from './use-patch-application-registration';
import { Alert } from '../alert';
import { ApplicationRegistrationModel } from '../../models/application-registration';
import { RequestState } from '../../state/state-utils/request-states';

export interface ChangeConfigFileFormProps {
  appName: string;
  radixConfigFullName?: string;
  acknowledgeWarnings?: boolean;
  app?: ApplicationRegistrationModel;
}

export const ChangeConfigFileForm = ({
  appName,
  radixConfigFullName,
}: ChangeConfigFileFormProps): JSX.Element => {
  const defaultRadixConfigFullName = 'radixconfig.yaml';
  const [currentRadixConfigFullName, setCurrentRadixConfigFullName] = useState(
    radixConfigFullName ?? defaultRadixConfigFullName
  );
  const [editedRadixConfigFullName, setEditedRadixConfigFullName] = useState(
    radixConfigFullName ?? defaultRadixConfigFullName
  );
  const [useAcknowledgeWarnings, setAcknowledgeWarnings] = useState(false);
  const [modifyState, patchFunc, resetState] =
    usePatchApplicationRegistration(appName);
  const [
    updateRadixConfigFullNameProgress,
    setUpdateRadixConfigFullNameProgress,
  ] = useState(false);

  const applicationRegistration = modifyState.data?.applicationRegistration;

  useEffect(() => {
    setEditedRadixConfigFullName(currentRadixConfigFullName);
  }, [currentRadixConfigFullName]);

  const handleSubmit = (ev: FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    setUpdateRadixConfigFullNameProgress(true);
    patchFunc({
      applicationRegistrationPatch: {
        radixConfigFullName: editedRadixConfigFullName,
      },
      acknowledgeWarnings: useAcknowledgeWarnings,
    });
  };

  const setEditedRadixConfigFullNameAndResetSaveState = (
    ev: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    ev.preventDefault();
    if (modifyState.status !== RequestState.IDLE) {
      resetState();
    }
    setEditedRadixConfigFullName(ev.target.value);
  };

  useEffect(() => {
    if (modifyState.status !== RequestState.IN_PROGRESS) {
      setUpdateRadixConfigFullNameProgress(false);
      setAcknowledgeWarnings(false);
    }
    if (
      modifyState.status === RequestState.SUCCESS &&
      applicationRegistration
    ) {
      setCurrentRadixConfigFullName(
        applicationRegistration.radixConfigFullName
      );
    }
  }, [modifyState, applicationRegistration]);

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Change config file</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-medium">
            <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
              {!updateRadixConfigFullNameProgress &&
                modifyState.status === RequestState.FAILURE && (
                  <div>
                    <Alert type="danger">
                      Failed to change config file. {modifyState.error}
                    </Alert>
                  </div>
                )}
              <TextField
                id="githubUrlField"
                disabled={modifyState.status === RequestState.IN_PROGRESS}
                value={editedRadixConfigFullName}
                onChange={setEditedRadixConfigFullNameAndResetSaveState}
                label="URL"
                helperText="e.g. 'path/radixconfig.yaml"
              />
              {modifyState.status === RequestState.IN_PROGRESS && (
                <div>
                  <CircularProgress size={24} /> Updating…
                </div>
              )}
              {!updateRadixConfigFullNameProgress &&
                modifyState.status !== RequestState.IN_PROGRESS && (
                  <div>
                    <Button
                      color="danger"
                      type="submit"
                      disabled={
                        currentRadixConfigFullName ===
                          editedRadixConfigFullName ||
                        editedRadixConfigFullName.length < 5
                      }
                    >
                      Change config file
                    </Button>
                  </div>
                )}
            </form>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
ChangeConfigFileForm.propTypes = {
  appName: PropTypes.string.isRequired,
  radixConfigFullName: PropTypes.string,
  acknowledgeWarnings: PropTypes.bool,
} as PropTypes.ValidationMap<ChangeConfigFileFormProps>;
