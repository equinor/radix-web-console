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
import type { HTMLAttributes, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../routes';
import type { ApplicationSummary, Component } from '../../store/radix-api';
import {
  type Vulnerability,
  useGetApplicationVulnerabilitySummariesQuery,
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
  type VulnerabilitySummary,
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

const latestJobStatus = {
  Failed: EnvironmentStatus.Danger,
} as const;

const visibleKeys: Array<Lowercase<Vulnerability['severity']>> = [
  'critical',
  'high',
];

function aggregateEnvironmentStatus(
  components: Component[]
): EnvironmentStatus {
  return Math.max(
    aggregateComponentEnvironmentStatus(components),
    aggregateComponentReplicaEnvironmentStatus(components)
  );
}

const AppItemStatus = ({
  environmentActiveComponents,
  latestJob,
  name,
}: ApplicationSummary) => {
  const state = useGetApplicationVulnerabilitySummariesQuery(
    { appName: name },
    { pollingInterval: 0 }
  );

  const vulnerabilities: VulnerabilitySummary = (state?.data ?? []).reduce(
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
                      latestJobStatus[latestJob.status ?? 'unknown'] ??
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

type WElementProps = {
  appName: string;
  isPlaceholder?: boolean;
} & HTMLAttributes<
  Pick<
    HTMLAnchorElement | HTMLDivElement,
    keyof HTMLAnchorElement & keyof HTMLDivElement
  >
>;
const WElement = ({ appName, isPlaceholder, ...rest }: WElementProps) =>
  isPlaceholder ? (
    <div {...rest} />
  ) : (
    <Link to={routeWithParams(routes.app, { appName })} {...rest} />
  );

export const AppListItem = ({
  app,
  handler,
  isPlaceholder,
  isFavourite,
  showStatus,
  name,
  isLoaded,
}: AppListItemProps) => (
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
