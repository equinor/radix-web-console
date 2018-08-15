import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Chip from '../chip';
import { getConnectionStatus } from '../../state/streaming';
import { getSecrets } from '../../state/secrets';
import streamingStatus from '../../state/streaming/connection-status';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const Secrets = ({ app, secrets, secretsLoaded }) => {
  if (!secretsLoaded) {
    return 'Loading secrets…';
  }

  if (secretsLoaded && secrets.length === 0) {
    return 'No secrets';
  }

  return (
    <ul className="o-inline-list o-inline-list--spacing">
      {secrets.map(secret => (
        <li key={secret.metadata.name}>
          <Chip>
            <Link
              to={routeWithParams(routes.appSecret, {
                id: app.metadata.name,
                secret: secret.metadata.name,
              })}
            >
              {secret.metadata.name}
            </Link>
          </Chip>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({
  secrets: getSecrets(state),
  secretsLoaded:
    getConnectionStatus(state, 'secrets') === streamingStatus.CONNECTED,
});

export default connect(mapStateToProps)(Secrets);
