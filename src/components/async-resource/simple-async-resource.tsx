import { CircularProgress, Typography } from '@equinor/eds-core-react';
import React, { FunctionComponent, PropsWithChildren, ReactNode } from 'react';

import { Alert } from '../alert';
import { AsyncState } from '../../effects/effect-types';
import { externalUrls } from '../../externalUrls';
import { RequestState } from '../../state/state-utils/request-states';
import { isNullOrUndefined } from '../../utils/object';

export interface SimpleAsyncResourceProps<T> {
  asyncState: Omit<AsyncState<T>, 'data'>;
  loadingContent?: ReactNode;
  errorContent?: ReactNode;
}

const LoadingComponent: FunctionComponent<{
  content?: ReactNode;
  defaultContent: React.JSX.Element;
}> = ({ content, defaultContent }) =>
  // if content is a boolean the intent is either to display or hide the default content
  !isNullOrUndefined(content) && content !== true ? (
    <>{content !== false && content}</>
  ) : (
    defaultContent
  );

export const SimpleAsyncResource = <T,>({
  asyncState,
  children,
  loadingContent = true,
  errorContent = true,
}: PropsWithChildren<SimpleAsyncResourceProps<T>>): React.JSX.Element =>
  !asyncState || asyncState.status === RequestState.IN_PROGRESS ? (
    <LoadingComponent
      content={loadingContent}
      defaultContent={
        <span>
          <CircularProgress size={16} /> Loading…
        </span>
      }
    />
  ) : asyncState.error ? (
    <LoadingComponent
      content={errorContent}
      defaultContent={
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
      }
    />
  ) : (
    <>{children}</>
  );

export default SimpleAsyncResource;
