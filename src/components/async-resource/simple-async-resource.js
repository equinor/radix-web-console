import React from 'react';

import Spinner from '../spinner';
import Alert from '../alert';

import externalUrls from '../../externalUrls';

const simpleAsyncResource = props => {
  const { isLoading, loading, error, failedContent, children } = props;

  if (isLoading) {
    return loading || <Spinner>Loading…</Spinner>;
  }

  if (error) {
    return (
      failedContent || (
        <Alert type="danger">
          <h2 className="o-heading-section">
            That didn't work{' '}
            <span role="img" aria-label="Sad">
              😞
            </span>
          </h2>
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

export default simpleAsyncResource;
