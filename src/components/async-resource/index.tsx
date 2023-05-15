import { CircularProgress, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Fragment, ReactNode, useState } from 'react';
import { connect } from 'react-redux';

import { Alert } from '../alert';
import { ApiResourceKey, ApiResourceParams } from '../../api/resources';
import { externalUrls } from '../../externalUrls';
import { RootState } from '../../init/store';
import { getError, hasData, isLoading } from '../../state/subscriptions';

interface AsyncResourceState {
  error?: string;
  isLoading: boolean;
  hasData: boolean;
}

interface AsyncResourcePropsBase<R extends string, P>
  extends AsyncResourceState {
  children?: ReactNode;
  failedContent?: ReactNode;
  loading?: ReactNode;
  resource: R;
  resourceParams: P;
}

export interface AsyncResourceProps
  extends AsyncResourcePropsBase<string, Array<string>> {}

export interface AsyncResourceStrictProps<K extends ApiResourceKey>
  extends AsyncResourcePropsBase<K, ApiResourceParams<K>> {}

export const AsyncResource = ({
  children,
  error,
  failedContent,
  hasData,
  isLoading,
  loading,
  resource,
  resourceParams,
}: AsyncResourceProps): JSX.Element => {
  if (!hasData && isLoading) {
    return (
      <>{loading}</> || (
        <span>
          <CircularProgress size={16} /> Loading…
        </span>
      )
    );
  } else if (error) {
    return (
      <>{failedContent}</> || (
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
            <samp className="word-break">{error}</samp>
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
      )
    );
  } else {
    return <>{children}</>;
  }
};

AsyncResource.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  failedContent: PropTypes.node,
  hasData: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loading: PropTypes.node,
  resource: PropTypes.string.isRequired,
  resourceParams: PropTypes.arrayOf(PropTypes.string).isRequired,
} as PropTypes.ValidationMap<AsyncResourceProps>;

function mapStateToProps<K extends ApiResourceKey>(
  state: RootState,
  {
    resource,
    resourceParams,
  }: Pick<AsyncResourceStrictProps<K>, 'resource' | 'resourceParams'>
): AsyncResourceState {
  return {
    error: getError(state, resource, resourceParams),
    hasData: hasData(state, resource, resourceParams),
    isLoading: isLoading(state, resource, resourceParams),
  };
}

export const AsyncResourceConnected = (
  props: Omit<AsyncResourceProps, keyof AsyncResourceState>
): JSX.Element => {
  const [AsyncResourceConnected] = useState(() =>
    connect(mapStateToProps)(AsyncResource)
  );
  return (
    <AsyncResourceConnected
      {...(props as { resource: ApiResourceKey; resourceParams: [] })}
    />
  );
};

export const AsyncResourceConnectedStrict = <K extends ApiResourceKey>(
  props: Omit<AsyncResourceStrictProps<K>, keyof AsyncResourceState>
): JSX.Element => <AsyncResourceConnected {...props} />;

export default AsyncResourceConnectedStrict;
