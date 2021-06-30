import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Code from '../code';
import FormField from '../form-field';

import { copyToClipboard } from '../../utils/string';
import { keys as configKeys } from '../../utils/config/keys';
import applicationRegistrationModel from '../../models/application-registration';
import configHandler from '../../utils/config';

import './style.css';
import externalUrls from '../../externalUrls';
import requestStates from '../../state/state-utils/request-states';
import Alert from '../alert';
import useRegenerateDeployKeyAndSecret from '../page-configuration/use-regenerate-deploy-key-and-secret';
import {
  Accordion,
  Button,
  List,
  Progress,
  Icon,
} from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';

const imageDeployKey = require('./deploy-key02.png').default;
const imageWebhook = require('./webhook02.png').default;

const radixZoneDNS = configHandler.getConfig(configKeys.RADIX_CLUSTER_BASE);
const webhookURL = `https://webhook.${radixZoneDNS}/events/github`;

export const ConfigureApplicationGithub = (props) => {
  const {
    app,
    startVisible,
    deployKeyTitle,
    webhookTitle,
    useOtherCiToolOptionVisible,
    onDeployKeyChange,
  } = props;
  const [useOtherCiTool, setUseOtherCiTool] = useState(false);
  const [deployKey, setDeployKey] = useState(app.publicKey);
  const [sharedSecret, setSharedSecret] = useState(app.sharedSecret);
  const [savedDeployKey, setSavedDeployKey] = useState(deployKey);
  const [savedSharedSecret, setSavedSharedSecret] = useState(sharedSecret);
  const [saveState, saveFunc, resetSaveState] = useRegenerateDeployKeyAndSecret(
    app.name
  );
  const deployOnlyHelp = (
    <span>
      Select this option if your project is hosted on multiple repositories
      and/or requires external control of building. Radix will no longer need a
      webhook and will instead deploy your app through the API/CLI.
      <br />
      See{' '}
      <a
        href={externalUrls.deployOnlyGuide}
        rel="noopener noreferrer"
        target="_blank"
      >
        Deployment Guide
      </a>{' '}
      for details.
    </span>
  );

  useEffect(() => {
    setDeployKey(savedDeployKey);
  }, [savedDeployKey]);

  useEffect(() => {
    setSharedSecret(savedSharedSecret);
  }, [savedSharedSecret]);

  useEffect(() => {
    if (saveState.status !== requestStates.SUCCESS) {
      return;
    }
    setSavedDeployKey(saveState.data.publicDeployKey);
    setSavedSharedSecret(saveState.data.sharedSecret);
    resetSaveState();
    onDeployKeyChange(app.name);
  }, [saveState, resetSaveState, onDeployKeyChange, app.name]);

  const saveDeployKeySetting = () => {
    saveFunc();
  };

  const isExpanded = startVisible ? true : false;

  return (
    <div className="configure-application-github">
      <p>To integrate with GitHub you must add a deploy key and a webhook</p>
      <Accordion chevronPosition="right" headerLevel="p" className="accordion">
        <Accordion.Item isExpanded={isExpanded} className="accordion__item">
          <Accordion.Header className="accordion__header body_short">
            {deployKeyTitle}
          </Accordion.Header>
          <Accordion.Panel className="accordion__panel">
            <p className="body_short">
              This allows Radix to clone the repository. Open the{' '}
              <a
                href={`${app.repository}/settings/keys/new`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Add New Deploy Key page
              </a>{' '}
              and follow the steps below
            </p>
            <div className="o-body-text">
              <img
                alt="'Add deploy key' steps on GitHub"
                src={imageDeployKey}
                srcSet={`${imageDeployKey} 2x`}
              />
              <List variant="numbered">
                <List.Item>
                  Give the key a name, e.g. "Radix deploy key"
                </List.Item>
                <List.Item>Copy and paste this key:</List.Item>
              </List>
              <Code copy wrap>
                {deployKey}
              </Code>
              <List variant="numbered" start="3">
                <List.Item>Press "Add key"</List.Item>
              </List>
            </div>
            <div className="o-body-text">
              <div className="o-action-bar">
                {saveState.status === requestStates.FAILURE && (
                  <Alert type="danger">
                    Failed to regenerate deploy key and webhook secret.
                    {saveState.error}
                  </Alert>
                )}
                {saveState.status === requestStates.IN_PROGRESS ? (
                  <>
                    <Progress.Circular size={16} />
                    <span className="progress">Regenerating...</span>
                  </>
                ) : (
                  <Button onClick={() => saveDeployKeySetting()}>
                    Regenerate deploy key and webhook secret
                  </Button>
                )}
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
        {useOtherCiToolOptionVisible && (
          <fieldset>
            <FormField help={deployOnlyHelp}>
              <input
                name="deployOnly"
                type="checkbox"
                value={useOtherCiTool}
                checked={useOtherCiTool}
                onChange={() => setUseOtherCiTool(!useOtherCiTool)}
              />
              Use other CI tool than Radix
            </FormField>
          </fieldset>
        )}
        {!useOtherCiTool && (
          <Accordion.Item isExpanded={isExpanded} className="accordion__item">
            <Accordion.Header className="accordion__header">
              {webhookTitle}
            </Accordion.Header>
            <Accordion.Panel className="accordion__panel">
              <p className="body_short">
                GitHub notifies Radix using a webhook whenever a code push is
                made. Open the{' '}
                <a
                  href={`${app.repository}/settings/hooks/new`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Add Webhook page
                </a>{' '}
                and follow the steps below
              </p>
              <div className="o-body-text">
                <img
                  alt="'Add webhook' steps on GitHub"
                  src={imageWebhook}
                  srcSet={`${imageWebhook} 2x`}
                />
                <List variant="numbered">
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
                    <code>{sharedSecret}</code>{' '}
                    <Button onClick={() => copyToClipboard(sharedSecret)}>
                      <Icon data={copy} size={12} />
                      Copy
                    </Button>
                  </List.Item>
                  <List.Item>Press "Add webhook"</List.Item>
                </List>
                {/* <p className="body_short">
                  1. As Payload URL, use <code>{webhookURL}</code>{' '}
                  <Button onClick={() => copyToClipboard(webhookURL)}>
                    <Icon data={copy} size={12} />
                    Copy
                  </Button>
                </p>
                <p className="body_short">
                  2. Choose <code>application/json</code> as Content type
                </p>
                <p className="body_short">
                  3. The Shared Secret for this application is{' '}
                  <code>{sharedSecret}</code>{' '}
                  <Button onClick={() => copyToClipboard(sharedSecret)}>
                    <Icon data={copy} size={12} />
                    Copy
                  </Button>
                </p>
                <p className="body_short">4. Press "Add webhook"</p> */}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        )}
      </Accordion>
    </div>
  );
};

ConfigureApplicationGithub.propTypes = {
  app: PropTypes.shape(applicationRegistrationModel).isRequired,
  startVisible: PropTypes.bool,
  useOtherCiToolOptionVisible: PropTypes.bool,
};

ConfigureApplicationGithub.defaultProps = {
  deployKeyTitle: 'Add deploy key',
  webhookTitle: 'Add webhook',
  useOtherCiToolOptionVisible: false,
};

export default ConfigureApplicationGithub;
