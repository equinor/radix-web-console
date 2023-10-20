import { CircularProgress, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import React, {
  Fragment,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react';
import { connect } from 'react-redux';

import { Alert } from '../alert';
import { ApiResourceKey, ApiResourceParams } from '../../api/resources';
import { externalUrls } from '../../externalUrls';
import { RootState } from '../../init/store';
import {
  SubscriptionObjectState,
  getError,
  getErrorCode,
  hasData,
  isLoading,
} from '../../state/subscriptions';
import { isNullOrUndefined } from '../../utils/object';

interface AsyncResourcePropsBase<R extends string, P>
  extends SubscriptionObjectState {
  loadingContent?: ReactNode;
  errorContent?: ReactNode;
  resource: R;
  resourceParams: P;
}

export type AsyncResourceProps = AsyncResourcePropsBase<string, Array<string>>;
export type AsyncResourceStrictProps<K extends ApiResourceKey> =
  AsyncResourcePropsBase<K, ApiResourceParams<K>>;

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

export const AsyncResource: FunctionComponent<
  PropsWithChildren<AsyncResourceProps>
> = ({
  children,
  hasData,
  isLoading,
  error,
  code,
  loadingContent = true,
  errorContent = true,
  resource,
  resourceParams,
}) =>
  !hasData && isLoading ? (
    <LoadingComponent
      content={loadingContent}
      defaultContent={
        <span>
          <CircularProgress size={16} /> Loading…
        </span>
      }
    />
  ) : error ? (
    <LoadingComponent
      content={errorContent}
      defaultContent={
        <Alert type="danger">
          <Typography variant="h4" token={{ color: 'currentColor' }}>
            That didn't work{' '}
            <span role="img" aria-label="Sad">
              😞
            </span>
          </Typography>
          <Typography token={{ color: 'currentColor' }}>
            Error subscribing to resource <code>{resource}</code>
            {resourceParams?.length > 0 && (
              <>
                {' '}
                with parameter{resourceParams.length > 1 ? 's' : ''}{' '}
                {resourceParams.map((param, idx) => (
                  <Fragment key={param}>
                    <code>{param}</code>
                    {idx < resourceParams.length - 1 ? ', ' : ''}
                  </Fragment>
                ))}
              </>
            )}
          </Typography>
          <div>
            <Typography variant="caption">Error message:</Typography>
            <samp className="word-break">
              {code && `${code}: `}
              {error}
            </samp>
          </div>
          <Typography token={{ color: 'currentColor' }}>
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
      }
    />
  ) : (
    <>{children}</>
  );

AsyncResource.propTypes = {
  children: PropTypes.node,
  hasData: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  code: PropTypes.number,
  loadingContent: PropTypes.node,
  errorContent: PropTypes.node,
  resource: PropTypes.string.isRequired,
  resourceParams: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export const AsyncResourceConnected: FunctionComponent<
  PropsWithChildren<Omit<AsyncResourceProps, keyof SubscriptionObjectState>>
> = (props) => {
  const [AsyncResourceConnected] = useState(() =>
    connect<
      SubscriptionObjectState,
      {},
      AsyncResourceStrictProps<ApiResourceKey>,
      RootState
    >((state, { resource, resourceParams }) => ({
      error: getError(state, resource, resourceParams),
      hasData: hasData(state, resource, resourceParams),
      isLoading: isLoading(state, resource, resourceParams),
      code: getErrorCode(state, resource, resourceParams),
    }))(AsyncResource)
  );

  return (
    <AsyncResourceConnected
      {...(props as AsyncResourceStrictProps<ApiResourceKey>)}
    />
  );
};

export const AsyncResourceConnectedStrict = <K extends ApiResourceKey>(
  props: PropsWithChildren<
    Omit<AsyncResourceStrictProps<K>, keyof SubscriptionObjectState>
  >
): React.JSX.Element => <AsyncResourceConnected {...props} />;

export default AsyncResourceConnectedStrict;
