import React from 'react';

import { CircularProgress } from '@equinor/eds-core-react';
import Alert from '../alert';

import externalUrls from '../../externalUrls';
import requestStates from '../../state/state-utils/request-states';

const SimpleAsyncResource = (props) => {
  const { asyncState, children } = props;

  if (!asyncState || asyncState.status === requestStates.IN_PROGRESS) {
    return (
      <span>
        <CircularProgress size="16" /> Loading…
      </span>
    );
  }

  if (asyncState.error) {
    return (
      <Alert type="danger">
        <h2 className="o-heading-section">
          That didn't work{' '}
          <span role="img" aria-label="Sad">
            😞
          </span>
        </h2>
        <p>
          The error message was <samp>{asyncState.error}</samp>
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
    );
  }

  return children || null;
};

export default SimpleAsyncResource;
