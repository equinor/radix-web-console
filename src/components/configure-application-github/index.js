import React from 'react';

import { ApplicationRegistration } from '../../models/';

import Button from '../button';
import Code from '../code';
import Panel from '../panel';
import Toggler from '../toggler';

import { copyToClipboard } from '../../utils/string';

const clusterDomain = require('../../config.json').clusterDomain;
const imageDeployKey = require('./deploy-key02.png');
const imageWebhook = require('./webhook02.png');
const webhookURL = `https://webhook-radix-github-webhook-prod.${clusterDomain}`;

export const ConfigureApplicationGithub = ({ app }) => (
  <div>
    <p>To integrate with GitHub you must add a deploy key and a webhook</p>
    <Panel>
      <Toggler summary="Add deploy key" startVisible>
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
                {app.publicKey}
              </Code>
            </li>
            <li>Press "Add key"</li>
          </ol>
        </div>
      </Toggler>
    </Panel>
    <Panel>
      <Toggler summary="Add webhook" startVisible>
        <div className="o-body-text">
          <p>
            GitHub notifies Radix using a webhook whenever a code push is made.
            Open the{' '}
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
      </Toggler>
    </Panel>
  </div>
);

ConfigureApplicationGithub.propTypes = {
  app: ApplicationRegistration.isRequired,
};

export default ConfigureApplicationGithub;
