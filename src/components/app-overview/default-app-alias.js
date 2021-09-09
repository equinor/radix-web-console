import React from 'react';
import { Link } from 'react-router-dom';

import * as routing from '../../utils/routing';

import { Icon, Typography } from '@equinor/eds-core-react';
import { link } from '@equinor/eds-icons';

export const DefaultAppAlias = ({ appName, appAlias }) => {
  if (!appAlias) {
    return null;
  }

  return (
    <div className="grid grid--gap-small">
      <Typography variant="h4">Default alias</Typography>
      <Typography variant="body_short">
        <Icon data={link} />
        <Typography link href={`https://${appAlias.url}`}>
          {appAlias.url}
        </Typography>{' '}
        is mapped to component{' '}
        <Link
          to={routing.getActiveComponentUrl(
            appName,
            appAlias.environmentName,
            appAlias.componentName
          )}
        >
          <Typography link as="span">
            {appAlias.componentName}
          </Typography>
        </Link>{' '}
        in environment{' '}
        <Link
          to={routing.getEnvUrl(
            appName,
            appAlias.environmentName,
            appAlias.componentName
          )}
        >
          <Typography link as="span">
            {appAlias.environmentName}
          </Typography>
        </Link>
      </Typography>
    </div>
  );
};

export default DefaultAppAlias;
