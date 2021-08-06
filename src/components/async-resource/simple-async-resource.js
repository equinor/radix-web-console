import React from 'react';

import { CircularProgress, Typography } from '@equinor/eds-core-react';
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
        <Typography variant="h4" token={{ color: 'currentColor' }}>
          That didn't work{' '}
          <span role="img" aria-label="Sad">
            😞
          </span>
        </Typography>
        <Typography variant="body_short" token={{ color: 'currentColor' }}>
          The error message was <samp>{asyncState.error}</samp>
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
    );
  }

  return children || null;
};

export default SimpleAsyncResource;
