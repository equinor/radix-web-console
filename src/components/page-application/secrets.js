import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getConnectionStatus } from '../../state/streaming';
import streamingStatus from '../../state/streaming/connection-status';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const Secrets = ({ app, secrets, secretsLoaded }) => (
  <section>
    {!secretsLoaded && 'Loading secrets…'}
    {secretsLoaded && (
      <ul>
        {secrets.map(secret => (
          <li key={secret.metadata.name}>
            <Link
              to={routeWithParams(routes.appSecret, {
                id: app.metadata.name,
                secret: secret.metadata.name,
              })}
            >
              {secret.metadata.name}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </section>
);

const mapStateToProps = state => ({
  secretsLoaded:
    getConnectionStatus(state, 'secrets') === streamingStatus.CONNECTED,
});

export default connect(mapStateToProps)(Secrets);
