import React from 'react';
import { Link } from 'react-router-dom';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as routing from '../../utils/routing';

export default ({ appName, appAlias }) => {
  if (!appAlias) {
    return null;
  }

  return (
    <div className="app-overview__info-tile">
      <h3 className="app-overview__info-tile-head">Default alias</h3>
      <FontAwesomeIcon
        className="app-overview__info-tile-image"
        icon={faLink}
        size="6x"
      />
      <div className="app-overview__info-tile-body">
        <p>
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
        </p>
      </div>
    </div>
  );
};
