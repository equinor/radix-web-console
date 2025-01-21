import { List, Typography } from '@equinor/eds-core-react';
import { configVariables } from '../../utils/config';
import { CompactCopyButton } from '../compact-copy-button';
import { ExternalLink } from '../link/external-link';
import imageWebhook from './webhook02.png';

type Props = { repository: string; appName: string; sharedSecret?: string };

export function ConfigureGithubWebhook({
  repository,
  appName,
  sharedSecret,
}: Props) {
  const radixZoneDNS = configVariables.RADIX_CLUSTER_BASE;
  return (
    <div className="grid grid--gap-medium">
      <Typography>
        GitHub notifies Radix using a webhook whenever a code push is made.
      </Typography>
      <div className="grid grid--gap-medium o-body-text">
        <List variant="numbered">
          <List.Item>
            Open the{' '}
            <ExternalLink href={`${repository}/settings/hooks/new`}>
              Add Webhook page
            </ExternalLink>{' '}
          </List.Item>
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
        <div className={'screenshot'}>
          <img
            alt="'Add webhook' steps on GitHub"
            src={imageWebhook}
            srcSet={`${imageWebhook} 2x`}
          />
        </div>
      </div>
    </div>
  );
}
