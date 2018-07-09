import React from 'react';
import { getSecrets } from '../../state/secrets';
import { connect } from 'react-redux';

import { getConnectionStatus } from '../../state/streaming';
import streamingStatus from '../../state/streaming/connection-status';

import './style.css';

const PageApplicationSecret = ({ ownProps, secrets, secretsLoaded }) => {
  var secret = secrets.find(
    secret => secret.metadata.name === ownProps.match.params.secret
  );

  if (!secretsLoaded) {
    return (
      <React.Fragment>
        <div className="o-layout-page-head">
          <h1 className="o-heading-page">
            <b>Secret:</b> Loading{' '}
          </h1>
        </div>
      </React.Fragment>
    );
  }

  if (secrets.length === 0 || !secret) {
    return (
      <React.Fragment>
        <div className="o-layout-page-head">
          <h1 className="o-heading-page">
            <b>Found no secrets</b>
          </h1>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="o-layout-page-head">
        <h1 className="o-heading-page">
          <b>Secret:</b>{' '}
          <div className="secret__name">{secret.metadata.name}</div>
        </h1>
      </div>
      {/* TODO: show secret details */}
      {secret && (
        <div className="secret__details">
          <p>Creation timestamp: {secret.metadata.creationTimestamp}</p>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ownProps: ownProps,
  secrets: getSecrets(state),
  secretsLoaded:
    getConnectionStatus(state, 'secrets') === streamingStatus.CONNECTED,
});

// export default PageApplicationSecret;
export default connect(mapStateToProps)(PageApplicationSecret);
