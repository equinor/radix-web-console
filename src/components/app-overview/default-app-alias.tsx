import { Icon, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';

import { getActiveComponentUrl, getEnvUrl } from '../../utils/routing';

export interface DefaultAppAliasProps {
  appName: string;
  appAlias: {
    componentName: string;
    environmentName: string;
    url: string;
  };
}

export const DefaultAppAlias = ({
  appName,
  appAlias: { componentName, environmentName, url },
}: DefaultAppAliasProps): JSX.Element => (
  <div className="grid grid--gap-small">
    <Typography variant="h4">Default alias</Typography>
    <Typography>
      <Icon data={link} />
      <Typography link href={`https://${url}`}>
        {url}
      </Typography>{' '}
      is mapped to component{' '}
      <Link to={getActiveComponentUrl(appName, environmentName, componentName)}>
        <Typography link as="span">
          {componentName}
        </Typography>
      </Link>{' '}
      in environment{' '}
      <Link to={getEnvUrl(appName, environmentName)}>
        <Typography link as="span">
          {environmentName}
        </Typography>
      </Link>
    </Typography>
  </div>
);