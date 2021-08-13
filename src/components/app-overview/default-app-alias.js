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
        <a href={`https://${appAlias.url}`}>{appAlias.url}</a> is mapped to
        component{' '}
        <Link
          to={routing.getActiveComponentUrl(
            appName,
            appAlias.environmentName,
            appAlias.componentName
          )}
        >
          {appAlias.componentName}
        </Link>{' '}
        in environment{' '}
        <Link
          to={routing.getEnvUrl(
            appName,
            appAlias.environmentName,
            appAlias.componentName
          )}
        >
          {appAlias.environmentName}
        </Link>
      </Typography>
    </div>
  );
};

export default DefaultAppAlias;
