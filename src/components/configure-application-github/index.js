import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Button from '../button';
import Code from '../code';
import Panel from '../panel';
import Toggler from '../toggler';
import FormField from '../form-field';

import { copyToClipboard } from '../../utils/string';
import { keys as configKeys } from '../../utils/config/keys';
import applicationRegistrationModel from '../../models/application-registration';
import configHandler from '../../utils/config';

import './style.css';
import externalUrls from '../../externalUrls';
import requestStates from '../../state/state-utils/request-states';
import Spinner from '../spinner';
import Alert from '../alert';
import useRegenerateDeployKeyAndSecret from '../page-configuration/use-regenerate-deploy-key-and-secret';

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
  }, [saveState, resetSaveState, onDeployKeyChange]);

  const saveDeployKeySetting = () => {
    saveFunc();
  };

  return (
    <div className="configure-application-github">
      <p>To integrate with GitHub you must add a deploy key and a webhook</p>
      <Panel>
        <Toggler summary={deployKeyTitle} startVisible={startVisible}>
          <div className="o-body-text">
            <p>
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
            <img
              alt="'Add deploy key' steps on GitHub"
              src={imageDeployKey}
              srcSet={`${imageDeployKey} 2x`}
            />
            <ol>
              <li>Give the key a name, e.g. "Radix deploy key"</li>
              <li>
                Copy and paste this key:
                <Code copy wrap>
                  {deployKey}
                </Code>
              </li>
              <li>Press "Add key"</li>
            </ol>
          </div>
          <div className="o-body-text">
            <div className="o-action-bar">
              {saveState.status === requestStates.IN_PROGRESS && (
                <Spinner>Regenerating…</Spinner>
              )}
              {saveState.status === requestStates.FAILURE && (
                <Alert type="danger">
                  Failed to regenerate deploy key and webhook secret.
                  {saveState.error}
                </Alert>
              )}
              {
                <Button
                  onClick={() => saveDeployKeySetting()}
                  btnType="danger"
                  disabled={
                    savedDeployKey !== deployKey ||
                    saveState.status === requestStates.IN_PROGRESS
                  }
                >
                  Regenerate deploy key and webhook secret
                </Button>
              }
            </div>
          </div>
        </Toggler>
      </Panel>
      <Panel>
        {useOtherCiToolOptionVisible && (
          <div>
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
          </div>
        )}
        {!useOtherCiTool && (
          <div>
            <Toggler summary={webhookTitle} startVisible={startVisible}>
              <div className="o-body-text">
                <p>
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
                <img
                  alt="'Add webhook' steps on GitHub"
                  src={imageWebhook}
                  srcSet={`${imageWebhook} 2x`}
                />
                <ol>
                  <li>
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
                    <code>{sharedSecret}</code>{' '}
                    <Button
                      onClick={() => copyToClipboard(sharedSecret)}
                      btnType={['default', 'tiny']}
                    >
                      Copy
                    </Button>
                  </li>
                  <li>Press "Add webhook"</li>
                </ol>
              </div>
            </Toggler>
          </div>
        )}
      </Panel>
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
