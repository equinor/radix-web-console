import { Icon, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { ApplicationAliasModel } from '../../models/radix-api/applications/application-alias';
import { getActiveComponentUrl, getEnvUrl } from '../../utils/routing';

export interface DefaultAppAliasProps {
  appName: string;
  appAlias: ApplicationAliasModel;
}

export const DefaultAppAlias: FunctionComponent<DefaultAppAliasProps> = ({
  appName,
  appAlias: { url, componentName, environmentName },
}) => (
  <div className="grid grid--gap-small">
    <Typography variant="h4">Default alias</Typography>
    <Typography>
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
    </Typography>
  </div>
);
