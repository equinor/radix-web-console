import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getError, isLoading } from '../../state/subscriptions';
import Alert from '../alert';
import Spinner from '../spinner';

import externalUrls from '../../externalUrls';

const AsyncResource = ({
  children,
  error,
  failed,
  isLoading,
  loading,
  resource,
  resourceParams,
}) => {
  if (isLoading) {
    return loading || <Spinner>Loading…</Spinner>;
  }

  if (error) {
    return (
      failed || (
        <Alert type="danger">
          <h2 className="o-heading-section">
            That didn't work{' '}
            <span role="img" aria-label="Sad">
              😞
            </span>
          </h2>
          <p>
            Error subscribing to resource <code>{resource}</code>
            {resourceParams && resourceParams.length && (
              <React.Fragment>
                {' '}
                with parameter{resourceParams.length > 1 ? 's' : null}{' '}
                {resourceParams.map((param, idx) => (
                  <React.Fragment key={param}>
                    <code>{param}</code>
                    {idx < resourceParams.length - 1 ? ', ' : null}
                  </React.Fragment>
                ))}
              </React.Fragment>
            )}
          </p>
          <p>
            The error message was <samp>{error}</samp>
          </p>
          <p>
            You may want to refresh the page. If the problem persists, get in
            touch on our Slack{' '}
            <a
              href={externalUrls.slackRadixSupport}
              rel="noopener noreferrer"
              target="_blank"
            >
              support channel
            </a>
          </p>
        </Alert>
      )
    );
  }

  return children || null;
};

AsyncResource.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  failed: PropTypes.node,
  isLoading: PropTypes.bool.isRequired,
  loading: PropTypes.node,
};

const mapStateToProps = (state, { resource, resourceParams }) => ({
  error: getError(state, resource, resourceParams),
  isLoading: isLoading(state, resource, resourceParams),
});

export default connect(mapStateToProps)(AsyncResource);
