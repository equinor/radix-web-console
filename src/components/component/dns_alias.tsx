import { Icon, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { getActiveComponentUrl, getEnvUrl } from '../../utils/routing';
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
    <Icon data={link} />
    <Typography link href={`https://${url}`}>
      {url}
    </Typography>{' '}
    is mapped to component{' '}
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
