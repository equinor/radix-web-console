import { CircularProgress, Typography } from '@equinor/eds-core-react';
import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import React, { FunctionComponent, PropsWithChildren, ReactNode } from 'react';

import { Alert } from '../alert';
import { externalUrls } from '../../externalUrls';
import { isNullOrUndefined } from '../../utils/object';

type AnotherAsyncStatus = Pick<
  TypedUseQueryHookResult<
    unknown,
    unknown,
    BaseQueryFn<[unknown], unknown, FetchBaseQueryError>
  >,
  'error' | 'isError' | 'isLoading'
>;

export interface AnotherAsyncResourceProps<T extends AnotherAsyncStatus> {
  asyncState: T;
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

export function getErrorData(error: AnotherAsyncStatus['error']): {
  code?: string | number;
  message: string;
} {
  let errObj: ReturnType<typeof getErrorData> = { message: '' };
  if ((error as SerializedError).message || (error as SerializedError).code) {
    const { code, message } = error as SerializedError;
    errObj = { code, message };
  } else if ((error as FetchBaseQueryError).status) {
    const err = error as FetchBaseQueryError;
    errObj.message = err.data as string;
    if (typeof err.status === 'number') {
      errObj.code = err.status;
    } else if (err.status === 'PARSING_ERROR') {
      errObj.code = err.originalStatus;
    }
  }

  return errObj;
}

const ErrorPanel: FunctionComponent<
  Required<Pick<AnotherAsyncStatus, 'error'>>
> = ({ error }) => {
  const { message, code } = getErrorData(error);

  return (
    <div>
      <Typography variant="caption">Error message:</Typography>
      <samp className="word-break">
        {code && `${code}: `}
        {message}
      </samp>
    </div>
  );
};

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
            {asyncState.error && <ErrorPanel error={asyncState.error} />}
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
