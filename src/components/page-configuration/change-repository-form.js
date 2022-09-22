import {
  Accordion,
  Button,
  CircularProgress,
  List,
  Icon,
  TextField,
  Typography,
  Checkbox,
} from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import imageDeployKey from './deploy-key.png';
import useSaveRepository from './use-save-repository';
import imageWebhook from './webhook02.png';

import { Alert } from '../alert';
import { Code } from '../code';
import { ApplicationRegistrationModelValidationMap } from '../../models/application-registration';
import { RequestState } from '../../state/state-utils/request-states';
import { configVariables } from '../../utils/config';
import { copyToClipboard } from '../../utils/string';

const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;
const webhookURL = `https://webhook.${radixZoneDNS}/events/github`;

export const ChangeRepositoryForm = (props) => {
  const app = props.app;
  const [currentRepository, setCurrentRepository] = useState(props.repository);
  const [editedRepository, setEditedRepository] = useState(props.repository);
  const [useAcknowledgeWarnings, setAcknowledgeWarnings] = useState(false);
  const [saveState, saveFunc, resetState] = useSaveRepository(
    props.appName,
    useAcknowledgeWarnings
  );
  const applicationRegistration =
    saveState.data?.applicationRegistration ?? undefined;
  const operationWarnings = saveState.data?.warnings ?? undefined;
  const [updateRepositoryProgress, setUpdateRepositoryProgress] =
    useState(false);

  useEffect(() => {
    setEditedRepository(currentRepository);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRepository]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setUpdateRepositoryProgress(true);
    saveFunc(editedRepository);
  };

  const setEditedRepositoryAndResetSaveState = (repository) => {
    if (saveState.status !== RequestState.IDLE) {
      resetState();
    }
    setEditedRepository(repository);
  };

  useEffect(() => {
    if (saveState.status !== RequestState.IN_PROGRESS) {
      setUpdateRepositoryProgress(false);
      setAcknowledgeWarnings(false);
    }
    if (
      saveState.status === RequestState.SUCCESS &&
      applicationRegistration &&
      !operationWarnings
    ) {
      setCurrentRepository(applicationRegistration.repository);
    }
  }, [saveState.status, applicationRegistration, operationWarnings]);

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Typography>Change GitHub repository</Typography>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--gap-medium">
            <form className="grid grid--gap-medium" onSubmit={handleSubmit}>
              {saveState.status === RequestState.FAILURE && (
                <div>
                  <Alert type="danger">
                    Failed to change repository. {saveState.error}
                  </Alert>
                </div>
              )}
              <TextField
                id="githubUrlField"
                disabled={
                  updateRepositoryProgress ||
                  saveState.status === RequestState.IN_PROGRESS
                }
                type="url"
                value={editedRepository}
                onChange={(ev) =>
                  setEditedRepositoryAndResetSaveState(ev.target.value)
                }
                label="URL"
                helperText="e.g. 'https://github.com/equinor/my-app'"
              />
              {(updateRepositoryProgress ||
                saveState.status === RequestState.IN_PROGRESS) && (
                <div>
                  <CircularProgress size={24} /> Updating…
                </div>
              )}
              {saveState.status === RequestState.SUCCESS && operationWarnings && (
                <div className="grid grid--gap-medium">
                  <List>
                    {operationWarnings?.map((message, i) => {
                      return (
                        <List.Item key={i}>
                          <Alert type="warning">{message}</Alert>
                        </List.Item>
                      );
                    })}
                  </List>
                  <Checkbox
                    label="Proceed with warnings"
                    name="acknowledgeWarnings"
                    checked={useAcknowledgeWarnings}
                    onChange={() =>
                      setAcknowledgeWarnings(!useAcknowledgeWarnings)
                    }
                  />
                </div>
              )}
              {!updateRepositoryProgress &&
                saveState.status !== RequestState.IN_PROGRESS && (
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
            {applicationRegistration &&
              !operationWarnings &&
              !(
                updateRepositoryProgress ||
                saveState.status === RequestState.IN_PROGRESS
              ) && (
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
                          href={`${currentRepository}/settings/keys`}
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
                          href={`${currentRepository}/settings/keys/new`}
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
                    <Code copy>{app.publicKey}</Code>
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
                          href={`${currentRepository}/settings/hooks`}
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
                          href={`${app.repository}/settings/hooks/new`}
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
                        <code>{app.sharedSecret}</code>{' '}
                        <Button
                          variant="ghost"
                          onClick={() => copyToClipboard(app.sharedSecret)}
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
  app: PropTypes.shape(ApplicationRegistrationModelValidationMap).isRequired,
};
