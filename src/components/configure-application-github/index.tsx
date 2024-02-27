import {
  Accordion,
  Button,
  Checkbox,
  List,
  Progress,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';

import imageDeployKey from './deploy-key02.png';
import imageWebhook from './webhook02.png';

import { Alert } from '../alert';
import { Code } from '../code';
import { CompactCopyButton } from '../compact-copy-button';
import { externalUrls } from '../../externalUrls';
import { configVariables } from '../../utils/config';

import './style.css';
import {
  ApplicationRegistration,
  useGetDeployKeyAndSecretQuery,
  useRegenerateDeployKeyMutation,
} from '../../store/radix-api';
import { pollingInterval } from '../../store/defaults';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { getFetchErrorMessage } from '../../store/utils';
import { ScrimPopup } from '../scrim-popup';

const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;

interface Props {
  app: ApplicationRegistration;
  refetch?: Function;
  onDeployKeyChange: (appName: string) => void;
  startVisible?: boolean;
  useOtherCiToolOptionVisible?: boolean;
  deployKeyTitle?: string;
  webhookTitle?: string;
  initialSecretPollInterval: number;
}

export const ConfigureApplicationGithub = ({
  app,
  refetch,
  startVisible,
  useOtherCiToolOptionVisible = false,
  deployKeyTitle = 'Add deploy key',
  webhookTitle = 'Add webhook',
}: Props) => {
  const isExpanded = !!startVisible;
  const webhookURL = `https://webhook.${radixZoneDNS}/events/github?appName=${app.name}`;
  const [useOtherCiTool, setUseOtherCiTool] = useState(false);
  const [visibleRegenerateScrim, setVisibleRegenerateScrim] =
    useState<boolean>(false);
  const [regenerateSecrets, { isLoading, error }] =
    useRegenerateDeployKeyMutation();
  const { data: secrets, refetch: refetchSecrets } =
    useGetDeployKeyAndSecretQuery(
      { appName: app.name },
      { pollingInterval, skip: useOtherCiTool }
    );

  const onRegenerate = handlePromiseWithToast(async () => {
    setVisibleRegenerateScrim(false);
    await regenerateSecrets({
      appName: app.name,
      regenerateDeployKeyAndSecretData: { sharedSecret: nanoid() },
    }).unwrap();
    await refetchSecrets();
    await refetch?.();
  }, 'Successfully re-generated deploy key and webhook secret');

  return (
    <div className="configure-application-github grid grid--gap-medium">
      <Typography>
        To integrate with GitHub you must add a deploy key and a webhook
      </Typography>
      <div className="grid grid--gap-small">
        <Accordion className="accordion" chevronPosition="right">
          <Accordion.Item isExpanded={isExpanded}>
            <Accordion.Header>
              <Accordion.HeaderTitle>
                <Typography>{deployKeyTitle}</Typography>
              </Accordion.HeaderTitle>
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
                        <Code copy>{secrets?.publicDeployKey}</Code>
                      </section>
                    </List.Item>
                    <List.Item>Press "Add key"</List.Item>
                  </List>
                </div>
                <div>
                  <div className="o-action-bar">
                    {error && (
                      <Alert type="danger">
                        Failed to regenerate deploy key and webhook secret.
                        {getFetchErrorMessage(error)}
                      </Alert>
                    )}
                    {isLoading ? (
                      <>
                        <Progress.Circular size={16} /> Regenerating…
                      </>
                    ) : (
                      <>
                        <ScrimPopup
                          title={`Warning`}
                          open={!!visibleRegenerateScrim}
                          onClose={() => setVisibleRegenerateScrim(false)}
                          isDismissable
                        >
                          <div className="grid grid--gap-medium grid--auto-columns regenerate-content">
                            <div className="regenerate-options">
                              <Typography>
                                Do you want to <strong>re-generate</strong>{' '}
                                deploy key and webhook secret?
                              </Typography>
                              <Typography>
                                New deploy key and webhook secret need to be put
                                to the GitHub repository settings
                              </Typography>
                            </div>

                            <Button.Group>
                              <Button onClick={onRegenerate}>Rerun</Button>
                              <Button
                                variant="outlined"
                                onClick={() => setVisibleRegenerateScrim(false)}
                              >
                                Cancel
                              </Button>
                            </Button.Group>
                          </div>
                        </ScrimPopup>
                        <Button onClick={() => setVisibleRegenerateScrim(true)}>
                          Re-generate deploy key and webhook secret
                        </Button>
                      </>
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
                Select this option if your project is hosted on multiple
                repositories and/or requires external control of building. Radix
                will no longer need a webhook and will instead deploy your app
                through the API/CLI.
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
              </Typography>
            </span>
          </fieldset>
        )}

        {!useOtherCiTool && (
          <Accordion className="accordion" chevronPosition="right">
            <Accordion.Item isExpanded={isExpanded}>
              <Accordion.Header>
                <Accordion.HeaderTitle>
                  <Typography>{webhookTitle}</Typography>
                </Accordion.HeaderTitle>
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
                        <CompactCopyButton content={webhookURL} />
                      </List.Item>
                      <List.Item>
                        Choose <code>application/json</code> as Content type
                      </List.Item>
                      <List.Item>
                        The Shared Secret for this application is{' '}
                        <code>{secrets?.sharedSecret}</code>{' '}
                        <CompactCopyButton content={secrets?.sharedSecret} />
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
  app: PropTypes.object
    .isRequired as PropTypes.Validator<ApplicationRegistration>,
  onDeployKeyChange: PropTypes.func.isRequired,
  startVisible: PropTypes.bool,
  useOtherCiToolOptionVisible: PropTypes.bool,
  deployKeyTitle: PropTypes.string,
  webhookTitle: PropTypes.string,
  initialSecretPollInterval: PropTypes.number,
};
