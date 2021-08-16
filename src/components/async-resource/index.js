import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getError, hasData, isLoading } from '../../state/subscriptions';
import Alert from '../alert';
import { CircularProgress, Typography } from '@equinor/eds-core-react';

import externalUrls from '../../externalUrls';

const AsyncResource = ({
  children,
  error,
  failedContent,
  hasData,
  isLoading,
  loading,
  resource,
  resourceParams,
  disableSync,
}) => {
  if (disableSync) {
    console.log('Sync is disabled');
    return '';
  }
  if (!hasData && isLoading) {
    return (
      loading || (
        <span>
          <CircularProgress size="16" /> Loading…
        </span>
      )
    );
  }

  if (error) {
    return (
      failedContent || (
        <Alert type="danger">
          <Typography variant="h4" token={{ color: 'currentColor' }}>
            That didn't work{' '}
            <span role="img" aria-label="Sad">
              😞
            </span>
          </Typography>
          <Typography variant="body_short" token={{ color: 'currentColor' }}>
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
          </Typography>
          <Typography variant="body_short" token={{ color: 'currentColor' }}>
            The error message was <samp>{error}</samp>
          </Typography>
          <Typography variant="body_short" token={{ color: 'currentColor' }}>
            You may want to refresh the page. If the problem persists, get in
            touch on our Slack{' '}
            <Typography
              link
              href={externalUrls.slackRadixSupport}
              rel="noopener noreferrer"
              target="_blank"
            >
              support channel
            </Typography>
          </Typography>
        </Alert>
      )
    );
  }

  return children || null;
};

AsyncResource.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  failedContent: PropTypes.node,
  hasData: PropTypes.bool.isRequired,
  loading: PropTypes.node,
  disableSync: PropTypes.bool,
};

const mapStateToProps = (state, { resource, resourceParams }) => ({
  error: getError(state, resource, resourceParams),
  hasData: hasData(state, resource, resourceParams),
  isLoading: isLoading(state, resource, resourceParams),
});

export default connect(mapStateToProps)(AsyncResource);
