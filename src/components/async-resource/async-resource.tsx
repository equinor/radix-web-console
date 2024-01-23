import { CircularProgress, Typography } from '@equinor/eds-core-react';
import { PropsWithChildren, ReactNode } from 'react';

import { Alert } from '../alert';
import { externalUrls } from '../../externalUrls';
import { FetchQueryResult } from '../../store/types';
import { getFetchErrorData } from '../../store/utils';

type AnotherAsyncResourceProps = PropsWithChildren<{
  asyncState: Pick<FetchQueryResult, 'error' | 'isError' | 'isLoading'>;
  loadingContent?: false | Exclude<ReactNode, true>;
  errorContent?: false | Exclude<ReactNode, true>;
}>;

export default function AsyncResource({
  asyncState,
  children,
  loadingContent,
  errorContent,
}: AnotherAsyncResourceProps) {
  if (!asyncState || asyncState.isLoading) {
    return (
      <UseContentOrDefault
        content={loadingContent}
        defaultContent={
          <span>
            <CircularProgress size={16} /> Loading…
          </span>
        }
      />
    );
  }

  if (asyncState.isError) {
    const { code, message } = getFetchErrorData(asyncState.error);
    return (
      <UseContentOrDefault
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
                <samp className="word-break">
                  {[code, message].filter((x) => !!x).join(': ')}
                </samp>
              </div>
              <Typography>
                You may want to refresh the page. If the problem persists, get
                in touch on our Slack{' '}
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
    );
  }

  return children;
}

type LoadingComponentProps = {
  content?: ReactNode;
  defaultContent: ReactNode;
};

function UseContentOrDefault({
  content,
  defaultContent,
}: LoadingComponentProps): ReactNode {
  if (content === false) {
    return null;
  }

  if (content) {
    return <>{content}</>;
  }

  return defaultContent;
}
