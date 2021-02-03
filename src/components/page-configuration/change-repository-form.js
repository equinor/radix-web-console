import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useSaveRepository from './use-save-repository';

import Alert from '../alert';
import FormField, { FormGroup } from '../form-field';
import Button from '../button';
import Panel from '../panel';
import Spinner from '../spinner';
import Toggler from '../toggler';

import requestStates from '../../state/state-utils/request-states';
import Code from '../code';
import { copyToClipboard } from '../../utils/string';
import configHandler from '../../utils/config';
import { keys as configKeys } from '../../utils/config/keys';

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
    <Panel>
      <Toggler summary="Change GitHub repository">
        <div>
          <form onSubmit={handleSubmit}>
            {saveState.status === requestStates.FAILURE && (
              <Alert type="danger" className="gap-bottom">
                Failed to change repository. {saveState.error}
              </Alert>
            )}
            <fieldset disabled={saveState.status === requestStates.IN_PROGRESS}>
              <FormField help="Full URL, e.g. 'https://github.com/equinor/my-app'">
                <input
                  name="repository"
                  type="url"
                  value={repository}
                  onChange={(ev) =>
                    setRepositoryAndResetSaveState(ev.target.value)
                  }
                  disabled={
                    updateRepositoryProgress ||
                    saveState.status === requestStates.IN_PROGRESS
                  }
                />
              </FormField>
              <div className="o-action-bar">
                {(updateRepositoryProgress ||
                  saveState.status === requestStates.IN_PROGRESS) && (
                  <Spinner>Updating…</Spinner>
                )}
                <Button
                  btnType="danger"
                  type="submit"
                  disabled={
                    savedRepository === repository || repository.length < 5
                  }
                >
                  Change repository
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
        {previousRepository != null &&
          previousRepository !== props.repository &&
          repository === props.repository &&
          !(
            updateRepositoryProgress ||
            saveState.status === requestStates.IN_PROGRESS
          ) && (
            <div>
              <FormGroup label="Move the Deploy Key to the new repository">
                <div className="o-body-text">
                  <ol>
                    <li>
                      Open the{' '}
                      <a
                        href={`${previousRepository}/settings/keys`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Deploy Key page
                      </a>{' '}
                      to delete the Deploy Key from the previous repository
                    </li>
                    <li>
                      Open the{' '}
                      <a
                        href={`${props.repository}/settings/keys/new`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Add New Deploy Key
                      </a>{' '}
                      and follow the steps below
                      <img
                        alt="'Add deploy key' steps on GitHub"
                        src={imageDeployKey}
                        srcSet={`${imageDeployKey} 2x`}
                      />
                    </li>
                    <li>Give the key a name, e.g. "Radix deploy key"</li>
                    <li>
                      Copy and paste this key:
                      <Code copy wrap>
                        {app.publicKey}
                      </Code>
                    </li>
                    <li>Press "Add key"</li>
                  </ol>
                </div>
              </FormGroup>
              <FormGroup label="Move the Webhook to the new repository">
                <div className="o-body-text">
                  <ol start="6">
                    <li>
                      Open the{' '}
                      <a
                        href={`${previousRepository}/settings/hooks`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Webhook page
                      </a>{' '}
                      of the previous repository and delete the existing Webhook
                    </li>
                    <li>
                      Open the{' '}
                      <a
                        href={`${app.repository}/settings/hooks/new`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Add Webhook page
                      </a>{' '}
                      and follow the steps below
                      <img
                        alt="'Add webhook' steps on GitHub"
                        src={imageWebhook}
                        srcSet={`${imageWebhook} 2x`}
                      />
                      As Payload URL, use <code>{webhookURL}</code>{' '}
                      <Button
                        onClick={() => copyToClipboard(webhookURL)}
                        btnType={['default', 'tiny']}
                      >
                        Copy
                      </Button>
                    </li>
                    <li>
                      Choose <code>application/json</code> as Content type
                    </li>
                    <li>
                      The Shared Secret for this application is{' '}
                      <code>{app.sharedSecret}</code>{' '}
                      <Button
                        onClick={() => copyToClipboard(app.sharedSecret)}
                        btnType={['default', 'tiny']}
                      >
                        Copy
                      </Button>
                    </li>
                    <li>Press "Add webhook"</li>
                  </ol>
                </div>
              </FormGroup>
            </div>
          )}
      </Toggler>
    </Panel>
  );
};

ChangeRepositoryForm.propTypes = {
  appName: PropTypes.string.isRequired,
  repository: PropTypes.string.isRequired,
};

export default ChangeRepositoryForm;
