import { CircularProgress, Typography } from '@equinor/eds-core-react';
import { ReactNode } from 'react';

import { Alert } from '../alert';
import { AsyncState } from '../../effects/effect-types';
import { externalUrls } from '../../externalUrls';
import { RequestState } from '../../state/state-utils/request-states';

export interface SimpleAsyncResourceProps<T> {
  asyncState: AsyncState<T>;
  children: ReactNode;
  loading?: JSX.Element;
  customError?: ReactNode;
}

export const SimpleAsyncResource = <T,>({
  asyncState,
  children,
  loading,
  customError,
}: SimpleAsyncResourceProps<T>): JSX.Element => {
  if (!asyncState || asyncState.status === RequestState.IN_PROGRESS) {
    return (
      loading || (
        <span>
          <CircularProgress size={16} /> Loading…
        </span>
      )
    );
  }

  if (asyncState.error) {
    return customError ? (
      <>{customError}</>
    ) : (
      <Alert type="danger">
        <Typography variant="h4">
          That didn't work{' '}
          <span role="img" aria-label="Sad">
            😞
          </span>
        </Typography>
        <div className="grid grid--gap-small">
          <div>
            <Typography variant="caption">Error message:</Typography>
            <samp className="word-break">{asyncState.error}</samp>
          </div>
          <Typography>
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
        </div>
      </Alert>
    );
  }

  return <>{children}</>;
};

export default SimpleAsyncResource;
