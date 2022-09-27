import {
  Accordion,
  Button,
  Checkbox,
  Icon,
  List,
  Progress,
  Typography,
} from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import imageDeployKey from './deploy-key02.png';
import imageWebhook from './webhook02.png';

import { Alert } from '../alert';
import { Code } from '../code';
import { useRegenerateDeployKeyAndSecret } from './use-regenerate-deploy-key-and-secret';
import { externalUrls } from '../../externalUrls';
import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../../models/application-registration';
import { RequestState } from '../../state/state-utils/request-states';
import { configVariables } from '../../utils/config';
import { copyToClipboard } from '../../utils/string';

import './style.css';

const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;

export interface ConfigureApplicationGithubProps {
  app: ApplicationRegistrationModel;
  onDeployKeyChange: (appName: string) => void;
  startVisible?: boolean;
  useOtherCiToolOptionVisible?: boolean;
  deployKeyTitle?: string;
  webhookTitle?: string;
}

export const ConfigureApplicationGithub = ({
  app,
  onDeployKeyChange,
  startVisible,
  useOtherCiToolOptionVisible,
  deployKeyTitle,
  webhookTitle,
}: ConfigureApplicationGithubProps): JSX.Element => {
  const [useOtherCiTool, setUseOtherCiTool] = useState(false);
  const [deployKey, setDeployKey] = useState(app.publicKey);
  const [sharedSecret, setSharedSecret] = useState(app.sharedSecret);
  const [savedDeployKey, setSavedDeployKey] = useState(deployKey);
  const [savedSharedSecret, setSavedSharedSecret] = useState(sharedSecret);
  const [saveState, saveFunc, resetSaveState] = useRegenerateDeployKeyAndSecret(
    app.name
  );
  const webhookURL = `https://webhook.${radixZoneDNS}/events/github?appName=${app.name}`;
  const deployOnlyHelp = (
    <>
      Select this option if your project is hosted on multiple repositories
      and/or requires external control of building. Radix will no longer need a
      webhook and will instead deploy your app through the API/CLI.
      <br />
      See{' '}
      <Typography
        link
        href={externalUrls.deployOnlyGuide}
        rel="noopener noreferrer"
        target="_blank"
        token={{ fontSize: 'inherit' }}
      >
        Deployment Guide
      </Typography>{' '}
      for details.
    </>
  );

  useEffect(() => {
    setDeployKey(savedDeployKey);
  }, [savedDeployKey]);

  useEffect(() => {
    setSharedSecret(savedSharedSecret);
  }, [savedSharedSecret]);

  useEffect(() => {
    if (saveState.status !== RequestState.SUCCESS) {
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

  const isExpanded = !!startVisible;

  return (
    <div className="configure-application-github grid grid--gap-medium">
      <Typography>
        To integrate with GitHub you must add a deploy key and a webhook
      </Typography>
      <div className="grid grid--gap-small">
        <Accordion className="accordion" chevronPosition="right">
          <Accordion.Item isExpanded={isExpanded}>
            <Accordion.Header>
              <Typography>{deployKeyTitle}</Typography>
            </Accordion.Header>
            <Accordion.Panel>
              <div className="grid grid--gap-medium">
                <Typography>
                  This allows Radix to clone the repository. Open the{' '}
                  <Typography
                    link
                    href={`${app.repository}/settings/keys/new`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Add New Deploy Key page
                  </Typography>{' '}
                  and follow the steps below
                </Typography>
                <div className="grid grid--gap-medium o-body-text">
                  <img
                    alt="'Add deploy key' steps on GitHub"
                    src={imageDeployKey}
                    srcSet={`${imageDeployKey} 2x`}
                  />
                  <List variant="numbered">
                    <List.Item>
                      Give the key a name, e.g. "Radix deploy key"
                    </List.Item>
                    <List.Item>
                      <section className="deploy-key">
                        Copy and paste this key:
                        <Code copy>{deployKey}</Code>
                      </section>
                    </List.Item>
                    <List.Item>Press "Add key"</List.Item>
                  </List>
                </div>
                <div>
                  <div className="o-action-bar">
                    {saveState.status === RequestState.FAILURE && (
                      <Alert type="danger">
                        Failed to regenerate deploy key and webhook secret.
                        {saveState.error}
                      </Alert>
                    )}
                    {saveState.status === RequestState.IN_PROGRESS ? (
                      <>
                        <Progress.Circular size={16} /> Regenerating…
                      </>
                    ) : (
                      <Button onClick={() => saveDeployKeySetting()}>
                        Regenerate deploy key and webhook secret
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        {useOtherCiToolOptionVisible && (
          <fieldset className="check-input">
            <Checkbox
              name="deployOnly"
              checked={useOtherCiTool}
              onChange={() => setUseOtherCiTool(!useOtherCiTool)}
            />{' '}
            <span>
              <Typography
                className="label"
                group="input"
                variant="text"
                token={{ color: 'currentColor' }}
              >
                Use other CI tool than Radix
              </Typography>
              <Typography
                group="navigation"
                variant="label"
                token={{ color: 'currentColor' }}
              >
                {deployOnlyHelp}
              </Typography>
            </span>
          </fieldset>
        )}
        {!useOtherCiTool && (
          <Accordion className="accordion" chevronPosition="right">
            <Accordion.Item isExpanded={isExpanded}>
              <Accordion.Header>
                <Typography>{webhookTitle}</Typography>
              </Accordion.Header>
              <Accordion.Panel>
                <div className="grid grid--gap-medium">
                  <Typography>
                    GitHub notifies Radix using a webhook whenever a code push
                    is made. Open the{' '}
                    <Typography
                      link
                      href={`${app.repository}/settings/hooks/new`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Add Webhook page
                    </Typography>{' '}
                    and follow the steps below
                  </Typography>
                  <div className="grid grid--gap-medium o-body-text">
                    <img
                      alt="'Add webhook' steps on GitHub"
                      src={imageWebhook}
                      srcSet={`${imageWebhook} 2x`}
                    />
                    <List variant="numbered">
                      <List.Item>
                        As Payload URL, use <code>{webhookURL}</code>{' '}
                        <Button
                          variant="ghost"
                          onClick={() => copyToClipboard(webhookURL)}
                        >
                          <Icon data={copy} /> Copy
                        </Button>
                      </List.Item>
                      <List.Item>
                        Choose <code>application/json</code> as Content type
                      </List.Item>
                      <List.Item>
                        The Shared Secret for this application is{' '}
                        <code>{sharedSecret}</code>{' '}
                        <Button
                          variant="ghost"
                          onClick={() => copyToClipboard(sharedSecret)}
                        >
                          <Icon data={copy} /> Copy
                        </Button>
                      </List.Item>
                      <List.Item>Press "Add webhook"</List.Item>
                    </List>
                  </div>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
    </div>
  );
};

ConfigureApplicationGithub.propTypes = {
  app: PropTypes.shape(ApplicationRegistrationModelValidationMap).isRequired,
  onDeployKeyChange: PropTypes.func.isRequired,
  startVisible: PropTypes.bool,
  useOtherCiToolOptionVisible: PropTypes.bool,
  deployKeyTitle: PropTypes.string,
  webhookTitle: PropTypes.string,
} as PropTypes.ValidationMap<ConfigureApplicationGithubProps>;

ConfigureApplicationGithub.defaultProps = {
  deployKeyTitle: 'Add deploy key',
  webhookTitle: 'Add webhook',
  useOtherCiToolOptionVisible: false,
} as Pick<
  ConfigureApplicationGithubProps,
  'deployKeyTitle' | 'webhookTitle' | 'useOtherCiToolOptionVisible'
>;

export default ConfigureApplicationGithub;
