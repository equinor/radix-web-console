import {
  Button,
  CircularProgress,
  Icon,
  Tooltip,
  Typography,
} from '@equinor/eds-core-react';
import { error_outlined, star_filled, star_outlined } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import * as PropTypes from 'prop-types';
import {
  type FunctionComponent,
  type HTMLAttributes,
  type MouseEvent,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../routes';
import type {
  ApplicationSummary,
  Component,
  JobSummary,
} from '../../store/radix-api';
import {
  type ImageScan,
  type Vulnerability,
  scanApi,
} from '../../store/scan-api';
import { filterFields } from '../../utils/filter-fields';
import { routeWithParams } from '../../utils/string';
import { AppBadge } from '../app-badge';
import AsyncResource from '../async-resource/async-resource';
import {
  EnvironmentCardStatus,
  EnvironmentVulnerabilityIndicator,
} from '../environments-summary/environment-card-status';
import {
  EnvironmentStatus,
  aggregateComponentEnvironmentStatus,
  aggregateComponentReplicaEnvironmentStatus,
  aggregateVulnerabilitySummaries,
  environmentVulnerabilitySummarizer,
} from '../environments-summary/environment-status-utils';

import './style.css';

export type FavouriteClickedHandler = (
  event: MouseEvent<HTMLButtonElement>,
  name: string
) => void;

export interface AppListItemProps {
  app?: Readonly<ApplicationSummary>;
  handler: FavouriteClickedHandler;
  isPlaceholder?: boolean;
  isFavourite?: boolean;
  showStatus?: boolean;
  name: string;
  isLoaded: boolean;
}

const latestJobStatus: Partial<
  Record<JobSummary['status'], EnvironmentStatus>
> = {
  Failed: EnvironmentStatus.Danger,
};

const visibleKeys: Array<Lowercase<Vulnerability['severity']>> = [
  'critical',
  'high',
];

function aggregateEnvironmentStatus(
  components: Readonly<Array<Component>>
): EnvironmentStatus {
  return Math.max(
    aggregateComponentEnvironmentStatus(components),
    aggregateComponentReplicaEnvironmentStatus(components)
  );
}

const AppItemStatus: FunctionComponent<ApplicationSummary> = ({
  environmentActiveComponents,
  latestJob,
  name,
}) => {
  const [trigger, state] =
    scanApi.endpoints.getApplicationVulnerabilitySummaries.useLazyQuery();

  useEffect(() => {
    const request = trigger({ appName: name });
    return () => request?.abort();
  }, [name, trigger]);

  const vulnerabilities = (state?.data ?? []).reduce<
    ImageScan['vulnerabilitySummary']
  >(
    (obj, x) =>
      aggregateVulnerabilitySummaries([
        obj,
        environmentVulnerabilitySummarizer(x),
      ]),
    {}
  );

  const time =
    latestJob &&
    (latestJob.status === 'Running' || !latestJob.ended
      ? latestJob.started
      : latestJob.ended);

  return (
    <div className="grid grid--gap-small">
      <div className="app-list-status--last-job grid--gap-small">
        <div>
          {time && (
            <div className="grid grid--gap-small grid--auto-columns">
              <Typography variant="caption">
                {formatDistanceToNow(new Date(time), { addSuffix: true })}
              </Typography>
              {latestJob &&
                (latestJob.status === 'Running' ||
                  latestJob.status === 'Stopping') && (
                  <CircularProgress size={16} />
                )}
            </div>
          )}
        </div>

        <div>
          <div className="grid grid--gap-x-small grid--auto-columns">
            <AsyncResource
              asyncState={state}
              loadingContent={false}
              errorContent={false}
            >
              {visibleKeys.some((key) => vulnerabilities[key] > 0) && (
                <EnvironmentVulnerabilityIndicator
                  title="Vulnerabilities"
                  size={22}
                  summary={filterFields(vulnerabilities, visibleKeys)}
                  visibleKeys={visibleKeys}
                />
              )}
            </AsyncResource>

            {(environmentActiveComponents || latestJob) && (
              <EnvironmentCardStatus
                title="Application status"
                statusElements={{
                  ...(latestJob && {
                    'Latest Job':
                      latestJobStatus[latestJob.status] ??
                      EnvironmentStatus.Consistent,
                  }),
                  ...(environmentActiveComponents && {
                    Environments: aggregateEnvironmentStatus(
                      Object.keys(environmentActiveComponents).reduce(
                        (obj, x) =>
                          environmentActiveComponents[x]?.length > 0
                            ? [...obj, ...environmentActiveComponents[x]]
                            : obj,
                        []
                      )
                    ),
                  }),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const WElement: FunctionComponent<
  { appName: string; isPlaceholder?: boolean } & HTMLAttributes<
    Pick<
      HTMLAnchorElement | HTMLDivElement,
      keyof HTMLAnchorElement & keyof HTMLDivElement
    >
  >
> = ({ appName, isPlaceholder, ...rest }) =>
  isPlaceholder ? (
    <div {...rest} />
  ) : (
    <Link to={routeWithParams(routes.app, { appName })} {...rest} />
  );

export const AppListItem: FunctionComponent<AppListItemProps> = ({
  app,
  handler,
  isPlaceholder,
  isFavourite,
  showStatus,
  name,
  isLoaded,
}) => (
  <WElement
    className={clsx('app-list-item', {
      'app-list-item--placeholder': isPlaceholder,
    })}
    appName={name}
    isPlaceholder={isPlaceholder}
  >
    <div className="app-list-item--area">
      <div className="app-list-item--area-icon">
        <AppBadge appName={name} size={40} />
      </div>
      <div className="grid app-list-item--area-details">
        <div className="app-list-item--details">
          <Typography className="app-list-item--details-title" variant="h6">
            {name}
          </Typography>
          <div className="app-list-item--details-favourite">
            <Button variant="ghost_icon" onClick={(e) => handler(e, name)}>
              <Icon data={isFavourite ? star_filled : star_outlined} />
            </Button>
          </div>
        </div>
        {isLoaded &&
          showStatus &&
          (app ? (
            <AppItemStatus {...app} />
          ) : (
            <Tooltip title="This application does not exist">
              <Icon data={error_outlined} />
            </Tooltip>
          ))}
      </div>
    </div>
  </WElement>
);

AppListItem.propTypes = {
  app: PropTypes.object as PropTypes.Validator<ApplicationSummary>,
  handler: PropTypes.func.isRequired,
  isPlaceholder: PropTypes.bool,
  isFavourite: PropTypes.bool,
  showStatus: PropTypes.bool,
  isLoaded: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};
