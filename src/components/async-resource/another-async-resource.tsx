import { CircularProgress, Typography } from '@equinor/eds-core-react';
import React, { PropsWithChildren } from 'react';

import { AsyncResourceContent, ErrorPanel, LoadingComponent } from './shared';

import { Alert } from '../alert';
import { externalUrls } from '../../externalUrls';
import { FetchQueryResult } from '../../store/types';
import { getFetchErrorData } from '../../store/utils';

export type AnotherAsyncStatus = Pick<
  FetchQueryResult,
  'error' | 'isError' | 'isLoading'
>;

export interface AnotherAsyncResourceProps<T extends AnotherAsyncStatus>
  extends AsyncResourceContent {
  asyncState: T;
}

export const AnotherAsyncResource = <T extends AnotherAsyncStatus>({
  asyncState,
  children,
  loadingContent = true,
  errorContent = true,
}: PropsWithChildren<AnotherAsyncResourceProps<T>>): React.JSX.Element =>
  !asyncState || asyncState.isLoading ? (
    <LoadingComponent
      content={loadingContent}
      defaultContent={
        <span>
          <CircularProgress size={16} /> Loading…
        </span>
      }
    />
  ) : asyncState.isError ? (
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
            {asyncState.error && (
              <ErrorPanel {...getFetchErrorData(asyncState.error)} />
            )}
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

export default AnotherAsyncResource;
