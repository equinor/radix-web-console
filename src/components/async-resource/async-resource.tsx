import { CircularProgress, Typography } from '@equinor/eds-core-react';
import type { PropsWithChildren, ReactNode } from 'react';

import { externalUrls } from '../../externalUrls';
import type { FetchQueryResult } from '../../store/types';
import { getFetchErrorCode, getFetchErrorData } from '../../store/utils';
import { Alert } from '../alert';
import { ExternalLink } from '../link/external-link';

type AnotherAsyncResourceProps = PropsWithChildren<{
  asyncState: Pick<FetchQueryResult, 'error' | 'isError' | 'isLoading'>;
  loadingContent?: false | Exclude<ReactNode, true>;
  errorContent?: false | Exclude<ReactNode, true>;
  nonFailureErrorCodes?: Array<number | string>;
}>;

export default function AsyncResource({
  asyncState,
  children,
  loadingContent,
  errorContent,
  nonFailureErrorCodes: nonErrorCodes,
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

  if (
    asyncState.isError &&
    !nonErrorCodes?.includes(getFetchErrorCode(asyncState.error) || '')
  ) {
    const { code, message } = getFetchErrorData(asyncState.error);

    return (
      <UseContentOrDefault
        content={errorContent}
        defaultContent={
          <Alert type="danger">
            <Typography variant="h4">
              That didn't work <image aria-label="Sad" />
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
                <ExternalLink href={externalUrls.slackRadixSupport}>
                  support channel
                </ExternalLink>
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
