import { List, Progress, Typography } from '@equinor/eds-core-react';
import { Code } from '../code';
import imageDeployKey from './deploy-key02.png';

import './style.css';
import type {
  ApplicationRegistration,
  DeployKeyAndSecret,
} from '../../store/radix-api';
import { ExternalLink } from '../link/external-link';

interface Props {
  app: ApplicationRegistration;
  deployKey?: DeployKeyAndSecret;
}

export const ConfigureDeployKey = ({ app, deployKey }: Props) => {
  return (
    <div className="grid grid--gap-medium">
      <Typography>This allows Radix to clone the repository.</Typography>
      <div className="grid grid--gap-medium o-body-text">
        <List variant="numbered">
          <List.Item>
            {deployKey?.publicDeployKey ? (
              <section className="deploy-key">
                Copy this key:
                <Code copy>{deployKey?.publicDeployKey}</Code>
              </section>
            ) : (
              <>
                <Progress.Circular size={16} /> Please wait…
              </>
            )}
          </List.Item>
          <List.Item>
            Open Github's{' '}
            <ExternalLink href={`${app.repository}/settings/keys/new`}>
              Add New Deploy Key page
            </ExternalLink>{' '}
            and paste in your key
          </List.Item>
          <List.Item>Give the key a name, e.g. "Radix deploy key"</List.Item>
          <List.Item>
            Make sure "Allow write access" is <strong>not</strong> checked
          </List.Item>
          <List.Item>Press "Add key"</List.Item>
        </List>
        <div className={'screenshot'}>
          <img
            alt="Add deploy key' steps on GitHub"
            src={imageDeployKey}
            srcSet={`${imageDeployKey} 2x`}
          />
        </div>
      </div>
    </div>
  );
};
