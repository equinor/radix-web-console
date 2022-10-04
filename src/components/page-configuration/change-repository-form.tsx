import {
  Accordion,
  Button,
  Checkbox,
  CircularProgress,
  Icon,
  List,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState, Validator } from 'react';
import { connect } from 'react-redux';

import { Alert } from '../alert';
import { RequestState } from '../../state/state-utils/request-states';
import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../../models/application-registration';
import imageDeployKey from '../configure-application-github/deploy-key02.png';
import imageWebhook from '../configure-application-github/webhook01.png';
import { Code } from '../code';
import { copyToClipboard } from '../../utils/string';
import { configVariables } from '../../utils/config';
import { useSaveRepository } from './use-save-repository';

const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;

export interface ChangeRepositoryFormProps {
  appName: string;
  repository: string;
  acknowledgeWarnings?: boolean;
  app?: ApplicationRegistrationModel;
}

export const ChangeRepositoryForm = (
  props: ChangeRepositoryFormProps
): JSX.Element => {
  const [currentRepository, setCurrentRepository] = useState(props.repository);
  const [editedRepository, setEditedRepository] = useState(props.repository);
  const [useAcknowledgeWarnings, setAcknowledgeWarnings] = useState(false);
  const [modifyState, saveFunc, resetState] = useSaveRepository(props.appName);
  const [updateRepositoryProgress, setUpdateRepositoryProgress] =
    useState(false);

  const webhookURL = `https://webhook.${radixZoneDNS}/events/github?appName=${props.appName}`;
  const applicationRegistration = modifyState.data?.applicationRegistration;
  const operationWarnings = modifyState.data?.warnings;

  useEffect(() => {
    setEditedRepository(currentRepository);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRepository]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setUpdateRepositoryProgress(true);
    saveFunc({
      applicationRegistrationPatch: { repository: editedRepository },
      acknowledgeWarnings: useAcknowledgeWarnings,
    });
  };

  const setEditedRepositoryAndResetSaveState = (
    ev: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    ev.preventDefault();
    if (modifyState.status !== RequestState.IDLE) {
      resetState();
    }
    setEditedRepository(ev.target.value);
  };

  useEffect(() => {
    if (modifyState.status !== RequestState.IN_PROGRESS) {
      setUpdateRepositoryProgress(false);
      setAcknowledgeWarnings(false);
    }
    if (
      modifyState.status === RequestState.SUCCESS &&
      applicationRegistration &&
      !operationWarnings
    ) {
      setCurrentRepository(applicationRegistration.repository);
    }
  }, [modifyState, applicationRegistration, operationWarnings]);

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Typography>Change GitHub repository</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-medium">
            <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
              {!updateRepositoryProgress &&
                modifyState.status === RequestState.FAILURE && (
                  <div>
                    <Alert type="danger">
                      Failed to change repository. {modifyState.error}
                    </Alert>
                  </div>
                )}
              <TextField
                id="githubUrlField"
                disabled={modifyState.status === RequestState.IN_PROGRESS}
                type="url"
                value={editedRepository}
                onChange={setEditedRepositoryAndResetSaveState}
                label="URL"
                helperText="e.g. 'https://github.com/equinor/my-app'"
              />
              {modifyState.status === RequestState.IN_PROGRESS && (
                <div>
                  <CircularProgress size={24} /> Updating…
                </div>
              )}
              {!updateRepositoryProgress &&
                modifyState?.status === RequestState.SUCCESS &&
                operationWarnings && (
                  <div className="grid grid--gap-medium">
                    <List>
                      {operationWarnings?.map((warning, i) => {
                        return (
                          <List.Item key={i}>
                            <Alert type="warning">{warning}</Alert>
                          </List.Item>
                        );
                      })}
                    </List>
                    <Checkbox
                      label="Proceed with warnings"
                      name="acknowledgeWarnings"
                      checked={props.acknowledgeWarnings}
                      onChange={() =>
                        setAcknowledgeWarnings(!useAcknowledgeWarnings)
                      }
                    />
                  </div>
                )}
              {!updateRepositoryProgress &&
                modifyState.status !== RequestState.IN_PROGRESS && (
                  <div>
                    <Button
                      color="danger"
                      type="submit"
                      disabled={
                        currentRepository === editedRepository ||
                        editedRepository.length < 5 ||
                        (operationWarnings && !useAcknowledgeWarnings)
                      }
                    >
                      Change repository
                    </Button>
                  </div>
                )}
            </form>
            {!updateRepositoryProgress &&
              applicationRegistration &&
              !operationWarnings &&
              !(modifyState.status === RequestState.IN_PROGRESS) && (
                <>
                  <Typography variant="body_short_bold">
                    Move the Deploy Key to the new repository
                  </Typography>
                  <div className="o-body-text grid grid--gap-medium">
                    <List variant="numbered">
                      <List.Item>
                        Open the{' '}
                        <Typography
                          link
                          href={`${applicationRegistration.repository}/settings/keys`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Deploy Key page
                        </Typography>{' '}
                        to delete the Deploy Key from the previous repository
                      </List.Item>
                      <List.Item>
                        Open the{' '}
                        <Typography
                          link
                          href={`${applicationRegistration.repository}/settings/keys/new`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Add New Deploy Key
                        </Typography>{' '}
                        and follow the steps below
                      </List.Item>
                    </List>
                    <img
                      alt="'Add deploy key' steps on GitHub"
                      src={imageDeployKey}
                      srcSet={`${imageDeployKey} 2x`}
                    />
                    <List variant="numbered" start="3">
                      <List.Item>
                        Give the key a name, e.g. "Radix deploy key"
                      </List.Item>
                      <List.Item>Copy and paste this key:</List.Item>
                    </List>
                    <Code copy>{props.app.publicKey}</Code>
                    <List variant="numbered" start="5">
                      <List.Item>Press "Add key"</List.Item>
                    </List>
                  </div>
                  <Typography variant="body_short_bold">
                    Move the Webhook to the new repository
                  </Typography>
                  <div className="o-body-text">
                    <List variant="numbered" start="6">
                      <List.Item>
                        Open the{' '}
                        <Typography
                          link
                          href={`${applicationRegistration.repository}/settings/hooks`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Webhook page
                        </Typography>{' '}
                        of the previous repository and delete the existing
                        Webhook
                      </List.Item>
                      <List.Item>
                        Open the{' '}
                        <Typography
                          link
                          href={`${applicationRegistration.repository}/settings/hooks/new`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Add Webhook page
                        </Typography>{' '}
                        and follow the steps below
                      </List.Item>
                    </List>
                    <img
                      alt="'Add webhook' steps on GitHub"
                      src={imageWebhook}
                      srcSet={`${imageWebhook} 2x`}
                    />
                    <List variant="numbered" start="8">
                      <List.Item>
                        As Payload URL, use <code>{webhookURL}</code>{' '}
                        <Button
                          variant="ghost"
                          onClick={() => copyToClipboard(webhookURL)}
                        >
                          <Icon data={copy} size={24} /> Copy
                        </Button>
                      </List.Item>
                      <List.Item>
                        Choose <code>application/json</code> as Content type
                      </List.Item>
                      <List.Item>
                        The Shared Secret for this application is{' '}
                        <code>{props.app.sharedSecret}</code>{' '}
                        <Button
                          variant="ghost"
                          onClick={() =>
                            copyToClipboard(props.app.sharedSecret)
                          }
                        >
                          <Icon data={copy} size={24} /> Copy
                        </Button>
                      </List.Item>
                      <List.Item>Press "Add webhook"</List.Item>
                    </List>
                  </div>
                </>
              )}
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
ChangeRepositoryForm.propTypes = {
  appName: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
  acknowledgeWarnings: PropTypes.bool,
  app: PropTypes.shape(
    ApplicationRegistrationModelValidationMap
  ) as Validator<ApplicationRegistrationModel>,
};

