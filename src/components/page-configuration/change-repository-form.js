import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useSaveRepository from './use-save-repository';

import Alert from '../alert';

import requestStates from '../../state/state-utils/request-states';
import Code from '../code';
import { copyToClipboard } from '../../utils/string';
import configHandler from '../../utils/config';
import { keys as configKeys } from '../../utils/config/keys';

import {
  Accordion,
  Input,
  Button,
  CircularProgress,
  List,
  Icon,
} from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';

const imageDeployKey = require('./deploy-key.png').default;
const imageWebhook = require('./webhook02.png').default;

const radixZoneDNS = configHandler.getConfig(configKeys.RADIX_CLUSTER_BASE);
const webhookURL = `https://webhook.${radixZoneDNS}/events/github`;

export const ChangeRepositoryForm = (props) => {
  const app = props.app;
  const [savedRepository, setSavedRepository] = useState(props.repository);
  const [repository, setRepository] = useState(props.repository);
  const [saveState, saveFunc, resetState] = useSaveRepository(props.appName);
  const [previousRepository, setPreviousRepository] = useState(null);
  const [updateRepositoryProgress, setUpdateRepositoryProgress] = useState(
    false
  );

  useEffect(
    () => {
      setRepository(props.repository);
      setUpdateRepositoryProgress(false);
      return () => {
        setPreviousRepository(repository);
      };
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
    if (saveState.status !== requestStates.IDLE) {
      resetState();
    }
    setRepository(repository);
  };

  return (
    <Accordion chevronPosition="right" headerLevel="p">
      <Accordion.Item className="accordion__item">
        <Accordion.Header className="accordion__header body_short">
          Change GitHub repository
        </Accordion.Header>
        <Accordion.Panel className="accordion__panel">
          <form onSubmit={handleSubmit} className="accordion__content">
            {saveState.status === requestStates.FAILURE && (
              <Alert type="danger" className="gap-bottom">
                Failed to change repository. {saveState.error}
              </Alert>
            )}
            <p className="body_short">
              Full URL, e.g. 'https://github.com/equinor/my-app'
            </p>
            <Input
              disabled={
                updateRepositoryProgress ||
                saveState.status === requestStates.IN_PROGRESS
              }
              type="url"
              value={repository}
              onChange={(ev) => setRepositoryAndResetSaveState(ev.target.value)}
            />
            <div className="o-action-bar">
              {(updateRepositoryProgress ||
                saveState.status === requestStates.IN_PROGRESS) && (
                <>
                  <CircularProgress size="24" />
                  <span className="progress">Updating…</span>
                </>
              )}
              {!updateRepositoryProgress &&
                saveState.status !== requestStates.IN_PROGRESS && (
                  <Button
                    color="danger"
                    type="submit"
                    disabled={
                      savedRepository === repository || repository.length < 5
                    }
                  >
                    Change repository
                  </Button>
                )}
            </div>
          </form>
          {previousRepository != null &&
            previousRepository !== props.repository &&
            repository === props.repository &&
            !(
              updateRepositoryProgress ||
              saveState.status === requestStates.IN_PROGRESS
            ) && (
              <div className="accordion__content">
                <p className="body_short_bold">
                  Move the Deploy Key to the new repository
                </p>
                <div className="o-body-text">
                  <List variant="numbered">
                    <List.Item>
                      Open the{' '}
                      <a
                        href={`${previousRepository}/settings/keys`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Deploy Key page
                      </a>{' '}
                      to delete the Deploy Key from the previous repository
                    </List.Item>
                    <List.Item>
                      Open the{' '}
                      <a
                        href={`${props.repository}/settings/keys/new`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Add New Deploy Key
                      </a>{' '}
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
                  <Code copy wrap>
                    {app.publicKey}
                  </Code>
                  <List variant="numbered" start="5">
                    <List.Item>Press "Add key"</List.Item>
                  </List>
                </div>
                <p className="body_short_bold">
                  Move the Webhook to the new repository
                </p>
                <div className="o-body-text">
                  <List variant="numbered" start="6">
                    <List.Item>
                      Open the{' '}
                      <a
                        href={`${previousRepository}/settings/hooks`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Webhook page
                      </a>{' '}
                      of the previous repository and delete the existing Webhook
                    </List.Item>
                    <List.Item>
                      Open the{' '}
                      <a
                        href={`${app.repository}/settings/hooks/new`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Add Webhook page
                      </a>{' '}
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
                      <Button onClick={() => copyToClipboard(webhookURL)}>
                        <Icon data={copy} size={12} />
                        Copy
                      </Button>
                    </List.Item>
                    <List.Item>
                      Choose <code>application/json</code> as Content type
                    </List.Item>
                    <List.Item>
                      The Shared Secret for this application is{' '}
                      <code>{app.sharedSecret}</code>{' '}
                      <Button onClick={() => copyToClipboard(app.sharedSecret)}>
                        <Icon data={copy} size={12} />
                        Copy
                      </Button>
                    </List.Item>
                    <List.Item>Press "Add webhook"</List.Item>
                  </List>
                </div>
              </div>
            )}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

ChangeRepositoryForm.propTypes = {
  appName: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
};

export default ChangeRepositoryForm;
