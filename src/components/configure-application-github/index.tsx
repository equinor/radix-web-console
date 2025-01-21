import { Button, List, Progress, Typography } from '@equinor/eds-core-react';
import { useState } from 'react';
import { Code } from '../code';
import imageDeployKey from './deploy-key02.png';

import './style.css';
import {
  type ApplicationRegistration,
  type DeployKeyAndSecret,
  useRegenerateDeployKeyMutation,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';
import { configVariables } from '../../utils/config';
import { Alert } from '../alert';
import { CompactCopyButton } from '../compact-copy-button';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { ExternalLink } from '../link/external-link';
import { ScrimPopup } from '../scrim-popup';
import imageWebhook from './webhook02.png';

interface Props {
  app: ApplicationRegistration;
  secrets?: DeployKeyAndSecret;
}

export const ConfigureApplicationGithub = ({ app, secrets }: Props) => {
  return (
    <div className="grid grid--gap-medium">
      <Typography>
        This allows Radix to clone the repository. Open the{' '}
        <ExternalLink href={`${app.repository}/settings/keys/new`}>
          Add New Deploy Key page
        </ExternalLink>{' '}
        and follow the steps below
      </Typography>
      <div className="grid grid--gap-medium o-body-text">
        <List variant="numbered">
          <List.Item>Give the key a name, e.g. "Radix deploy key"</List.Item>
          <List.Item>
            {secrets?.publicDeployKey ? (
              <section className="deploy-key">
                Copy and paste this key:
                <Code copy>{secrets?.publicDeployKey}</Code>
              </section>
            ) : (
              <>
                <Progress.Circular size={16} /> Please wait…
              </>
            )}
          </List.Item>
          <List.Item>Press "Add key"</List.Item>
        </List>
        <img
          alt="Add deploy key' steps on GitHub"
          src={imageDeployKey}
          srcSet={`${imageDeployKey} 2x`}
        />
      </div>
    </div>
  );
};

type RegenerateSecretsScrimProps = {
  appName: string;
  refetchSecrets: () => Promise<unknown>;
};

export function RegenerateSecretsScrim({
  appName,
  refetchSecrets,
}: RegenerateSecretsScrimProps) {
  const [show, setShow] = useState(false);

  const [regenerateSecrets, regenerateSecretState] =
    useRegenerateDeployKeyMutation();

  const onRegenerate = handlePromiseWithToast(async () => {
    await regenerateSecrets({
      appName,
      regenerateDeployKeyAndSecretData: {
        sharedSecret: crypto.randomUUID(),
      },
    }).unwrap();
    await refetchSecrets();
  });

  return (
    <>
      <ScrimPopup
        title={'Warning'}
        open={!!show}
        onClose={() => setShow(false)}
        isDismissable
      >
        <div className="grid grid--gap-medium grid--auto-columns regenerate-content">
          <div className="regenerate-options">
            <Typography>
              Do you want to <strong>regenerate</strong> deploy key and webhook
              secret?
            </Typography>
            <Typography>
              New deploy key and webhook secret need to be put to the GitHub
              repository settings
            </Typography>
          </div>

          <Button.Group>
            <Button onClick={onRegenerate}>Rerun</Button>
            <Button variant="outlined" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </Button.Group>
        </div>
      </ScrimPopup>

      <div>
        <div className="o-action-bar">
          {regenerateSecretState.isError ? (
            <Alert type="danger">
              Failed to regenerate deploy key and webhook secret.
              <br />
              {getFetchErrorMessage(regenerateSecretState.error)}
            </Alert>
          ) : null}
          {regenerateSecretState.isLoading ? (
            <>
              <Progress.Circular size={16} /> Regenerating…
            </>
          ) : (
            <div>
              <Typography variant="h5">
                Regularly regenerate deploy key and webhook secret
              </Typography>
              <Button onClick={() => setShow(true)}>Regenerate</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function ConfigureGithubWebhook({
  repository,
  appName,
  sharedSecret,
}: { repository: string; appName: string; sharedSecret?: string }) {
  const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;
  return (
    <div className="grid grid--gap-medium">
      <Typography>
        GitHub notifies Radix using a webhook whenever a code push is made. Open
        the{' '}
        <ExternalLink href={`${repository}/settings/hooks/new`}>
          Add Webhook page
        </ExternalLink>{' '}
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
            As Payload URL, use{' '}
            <code>{`https://webhook.${radixZoneDNS}/events/github?appName=${appName}`}</code>{' '}
            <CompactCopyButton
              content={`https://webhook.${radixZoneDNS}/events/github?appName=${appName}`}
            />
          </List.Item>
          <List.Item>
            Choose <code>application/json</code> as Content type
          </List.Item>
          <List.Item>
            The Shared Secret for this application is{' '}
            <code>{sharedSecret}</code>{' '}
            <CompactCopyButton content={sharedSecret ?? ''} />
          </List.Item>
          <List.Item>Press "Add webhook"</List.Item>
        </List>
      </div>
    </div>
  );
}
