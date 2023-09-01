import {
  Accordion,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';

import { usePatchApplicationRegistration } from './use-patch-application-registration';

import { Alert } from '../alert';
import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../../models/radix-api/applications/application-registration';
import { RequestState } from '../../state/state-utils/request-states';

export interface ChangeConfigFileFormProps {
  appName: string;
  radixConfigFullName?: string;
  acknowledgeWarnings?: boolean;
  app?: ApplicationRegistrationModel;
}

const defaultConfigName = 'radixconfig.yaml';

export const ChangeConfigFileForm: FunctionComponent<
  ChangeConfigFileFormProps
> = ({ appName, radixConfigFullName }) => {
  const [modifyState, patchFunc, resetState] =
    usePatchApplicationRegistration(appName);
  const [configNameState, setConfigNameState] = useState(
    radixConfigFullName ?? defaultConfigName
  );
  const [savedConfigNameState, setSavedConfigNameState] = useState(
    radixConfigFullName ?? defaultConfigName
  );
  const [patchConfigNameProgress, setPatchConfigNameProgress] = useState(false);
  const [useAcknowledgeWarnings, setAcknowledgeWarnings] = useState(false);

  useEffect(() => {
    setConfigNameState(savedConfigNameState);
  }, [savedConfigNameState]);

  useEffect(() => {
    if (modifyState.status !== RequestState.IN_PROGRESS) {
      setPatchConfigNameProgress(false);
      setAcknowledgeWarnings(false);
    }

    if (
      modifyState.status === RequestState.SUCCESS &&
      modifyState.data?.applicationRegistration
    ) {
      setSavedConfigNameState(
        modifyState.data.applicationRegistration.radixConfigFullName
      );
    }
  }, [modifyState.status, modifyState.data]);

  function handleSubmit(ev: FormEvent): void {
    ev.preventDefault();
    setPatchConfigNameProgress(true);
    patchFunc({
      applicationRegistrationPatch: {
        radixConfigFullName: configNameState,
      },
      acknowledgeWarnings: useAcknowledgeWarnings,
    });
  }

  function onGithubUrlChange(ev: ChangeEvent<HTMLTextAreaElement>): void {
    ev.preventDefault();
    if (modifyState.status !== RequestState.IDLE) {
      resetState();
    }
    setConfigNameState(ev.target.value);
  }

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
              {!patchConfigNameProgress &&
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
                value={configNameState}
                onChange={onGithubUrlChange}
                label="URL"
                helperText="e.g. 'path/radixconfig.yaml"
              />
              {modifyState.status === RequestState.IN_PROGRESS ? (
                <div>
                  <CircularProgress size={24} /> Updating…
                </div>
              ) : (
                !patchConfigNameProgress && (
                  <div>
                    <Button
                      color="danger"
                      type="submit"
                      disabled={
                        savedConfigNameState === configNameState ||
                        configNameState.length < 5
                      }
                    >
                      Change config file
                    </Button>
                  </div>
                )
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
  app: PropTypes.shape(
    ApplicationRegistrationModelValidationMap
  ) as PropTypes.Validator<ApplicationRegistrationModel>,
};
