import { Typography } from '@equinor/eds-core-react';
import type { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { getActiveComponentUrl, getEnvUrl } from '../../utils/routing';
import { ExternalLink } from '../link/external-link';
export interface EnvironmentComponentProps {
  appName: string;
  url: string;
  componentName: string;
  environmentName: string;
}

export const DNSAlias: FunctionComponent<EnvironmentComponentProps> = ({
  appName,
  url,
  componentName,
  environmentName,
}) => (
  <>
    <ExternalLink href={`https://${url}`}>{url}</ExternalLink> is mapped to
    component{' '}
    <Typography
      as={Link}
      to={getActiveComponentUrl(appName, environmentName, componentName)}
      link
    >
      {componentName}
    </Typography>{' '}
    in environment{' '}
    <Typography as={Link} to={getEnvUrl(appName, environmentName)} link>
      {environmentName}
    </Typography>
  </>
);
