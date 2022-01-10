import {
  Accordion,
  Button,
  CircularProgress,
  List,
  Icon,
  TextField,
  Typography,
} from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import useSaveRepository from './use-save-repository';

import { Alert } from '../alert';
import { Code } from '../code';
import { RequestState } from '../../state/state-utils/request-states';
import { configVariables } from '../../utils/config';
import { copyToClipboard } from '../../utils/string';

const imageDeployKey = require('./deploy-key.png').default;
const imageWebhook = require('./webhook02.png').default;

const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;
const webhookURL = `https://webhook.${radixZoneDNS}/events/github`;

export const ChangeRepositoryForm = (props) => {
  const app = props.app;
  const [savedRepository, setSavedRepository] = useState(props.repository);
  const [repository, setRepository] = useState(props.repository);
  const [saveState, saveFunc, resetState] = useSaveRepository(props.appName);
  const [previousRepository, setPreviousRepository] = useState(null);
  const [updateRepositoryProgress, setUpdateRepositoryProgress] =
    useState(false);

  useEffect(
    () => {
      setRepository(props.repository);
      setUpdateRepositoryProgress(false);
      return () => setPreviousRepository(repository);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.repository]
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setUpdateRepositoryProgress(true);
    saveFunc(repository);
    setSavedRepository(repository);
  };

  const setRepositoryAndResetSaveState = (repository) => {
    if (saveState.status !== RequestState.IDLE) {
      resetState();
    }
    setRepository(repository);
  };

  return (
    <Accordion.Item className="accordion">
      <Accordion.Header>
        <Typography>Change GitHub repository</Typography>
      </Accordion.Header>
      <Accordion.Panel>
        <div className="grid grid--gap-medium">
          <form onSubmit={handleSubmit} className="grid grid--gap-medium">
            {saveState.status === RequestState.FAILURE && (
              <div>
                <Alert type="danger">
                  Failed to change repository. {saveState.error}
                </Alert>
              </div>
            )}
            <TextField
              disabled={
                updateRepositoryProgress ||
                saveState.status === RequestState.IN_PROGRESS
              }
              type="url"
              value={repository}
              onChange={(ev) => setRepositoryAndResetSaveState(ev.target.value)}
              label="URL"
              helperText="e.g. 'https://github.com/equinor/my-app'"
            />
            {(updateRepositoryProgress ||
              saveState.status === RequestState.IN_PROGRESS) && (
              <div>
                <CircularProgress size={20} /> Updating…
              </div>
            )}
            {!updateRepositoryProgress &&
              saveState.status !== RequestState.IN_PROGRESS && (
                <div>
                  <Button
                    color="danger"
                    type="submit"
                    disabled={
                      savedRepository === repository || repository.length < 5
                    }
                  >
                    Change repository
                  </Button>
                </div>
              )}
          </form>
          {previousRepository &&
            previousRepository !== props.repository &&
            repository === props.repository &&
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
                        href={`${previousRepository}/settings/keys`}
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
                        href={`${props.repository}/settings/keys/new`}
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
                        href={`${previousRepository}/settings/hooks`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Webhook page
                      </Typography>{' '}
                      of the previous repository and delete the existing Webhook
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
  );
};

ChangeRepositoryForm.propTypes = {
  appName: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
};

export default ChangeRepositoryForm;
