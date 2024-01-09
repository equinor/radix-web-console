import {
  Accordion,
  Button,
  Checkbox,
  CircularProgress,
  List,
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

import imageDeployKey from '../configure-application-github/deploy-key02.png';
import imageWebhook from '../configure-application-github/webhook01.png';

import { Alert } from '../alert';
import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { Code } from '../code';
import { CompactCopyButton } from '../compact-copy-button';
import { usePollDeployKeyAndSecret } from '../configure-application-github/use-poll-deploy-key-and-secrets';
import { RequestState } from '../../state/state-utils/request-states';
import { configVariables } from '../../utils/config';
import { ApplicationRegistration } from '../../store/radix-api';

const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;

export interface ChangeRepositoryFormProps {
  appName: string;
  repository: string;
  acknowledgeWarnings?: boolean;
  app?: ApplicationRegistration;
}

const DeployKey: FunctionComponent<{ appName: string }> = ({ appName }) => {
  const [deployKeyState] = usePollDeployKeyAndSecret(appName, 0);

  return (
    <SimpleAsyncResource asyncState={deployKeyState}>
      <Code copy>{deployKeyState.data?.publicDeployKey}</Code>
    </SimpleAsyncResource>
  );
};

export const ChangeRepositoryForm: FunctionComponent<
  ChangeRepositoryFormProps
> = ({ appName, repository, acknowledgeWarnings, app }) => {
  const [currentRepository, setCurrentRepository] = useState(repository);
  const [editedRepository, setEditedRepository] = useState(repository);
  const [useAcknowledgeWarnings, setAcknowledgeWarnings] = useState(false);
  const [modifyState, patchFunc, resetState] =
    usePatchApplicationRegistration(appName);
  const [updateRepositoryProgress, setUpdateRepositoryProgress] =
    useState(false);

  const webhookURL = `https://webhook.${radixZoneDNS}/events/github?appName=${appName}`;
  const applicationRegistration = modifyState.data?.applicationRegistration;
  const operationWarnings = modifyState.data?.warnings;

  useEffect(() => {
    setEditedRepository(currentRepository);
  }, [currentRepository]);

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
  }, [applicationRegistration, modifyState.status, operationWarnings]);

  function handleSubmit(ev: FormEvent<HTMLFormElement>): void {
    ev.preventDefault();
    setUpdateRepositoryProgress(true);
    patchFunc({
      applicationRegistrationPatch: { repository: editedRepository },
      acknowledgeWarnings: useAcknowledgeWarnings,
    });
  }

  function onGithubUrlChange(ev: ChangeEvent<HTMLTextAreaElement>): void {
    ev.preventDefault();
    if (modifyState.status !== RequestState.IDLE) {
      resetState();
    }
    setEditedRepository(ev.target.value);
  }

  return (
    <Accordion className="accordion" chevronPosition="right">
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography>Change GitHub repository</Typography>
          </Accordion.HeaderTitle>
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
                onChange={onGithubUrlChange}
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
                      {operationWarnings.map((warning, i) => (
                        <List.Item key={i}>
                          <Alert type="warning">{warning}</Alert>
                        </List.Item>
                      ))}
                    </List>
                    <Checkbox
                      label="Proceed with warnings"
                      name="acknowledgeWarnings"
                      checked={acknowledgeWarnings}
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
                    <DeployKey appName={appName} />
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
                        <CompactCopyButton content={webhookURL} />
                      </List.Item>
                      <List.Item>
                        Choose <code>application/json</code> as Content type
                      </List.Item>
                      <List.Item>
                        The Shared Secret for this application is{' '}
                        <code>{app.sharedSecret}</code>{' '}
                        <CompactCopyButton content={app.sharedSecret} />
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
  app: PropTypes.object as PropTypes.Validator<ApplicationRegistration>,
};
