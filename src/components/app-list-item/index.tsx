import {
  Button,
  CircularProgress,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { star_filled, star_outlined } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import * as PropTypes from 'prop-types';
import {
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource/async-resource';
import { AppBadge } from '../app-badge';
import {
  EnvironmentCardStatus,
  EnvironmentVulnerabilityIndicator,
} from '../environments-summary/environment-card-status';
import {
  aggregateComponentEnvironmentStatus,
  aggregateReplicaEnvironmentStatus,
  aggregateVulnerabilitySummaries,
  EnvironmentStatus,
  environmentVulnerabilitySummarizer,
} from '../environments-summary/environment-status-utils';
import { filterFields } from '../../models/model-utils';
import { routes } from '../../routes';
import {
  ApplicationSummary,
  Component,
  JobSummary,
  ReplicaSummary,
} from '../../store/radix-api';
import { ImageScan, Vulnerability, scanApi } from '../../store/scan-api';
import { routeWithParams } from '../../utils/string';

import './style.css';

export type FavouriteClickedHandler = (
  event: MouseEvent<HTMLButtonElement>,
  name: string
) => void;

export interface AppListItemProps {
  app: Readonly<ApplicationSummary>;
  handler: FavouriteClickedHandler;
  isPlaceholder?: boolean;
  isFavourite?: boolean;
  showStatus?: boolean;
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
    aggregateReplicaEnvironmentStatus(
      components?.reduce<Array<ReplicaSummary>>(
        (obj, { replicaList }) =>
          !replicaList ? obj : [...obj, ...replicaList],
        []
      )
    )
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
}) => (
  <WElement
    className={clsx('app-list-item', {
      'app-list-item--placeholder': isPlaceholder,
    })}
    appName={app.name}
    isPlaceholder={isPlaceholder}
  >
    <div className="app-list-item--area">
      <div className="app-list-item--area-icon">
        <AppBadge appName={app.name} size={40} />
      </div>
      <div className="grid app-list-item--area-details">
        <div className="app-list-item--details">
          <Typography className="app-list-item--details-title" variant="h6">
            {app.name}
          </Typography>
          <div className="app-list-item--details-favourite">
            <Button variant="ghost_icon" onClick={(e) => handler(e, app.name)}>
              <Icon data={isFavourite ? star_filled : star_outlined} />
            </Button>
          </div>
        </div>
        {showStatus && <AppItemStatus {...app} />}
      </div>
    </div>
  </WElement>
);

AppListItem.propTypes = {
  app: PropTypes.object.isRequired as PropTypes.Validator<ApplicationSummary>,
  handler: PropTypes.func.isRequired,
  isPlaceholder: PropTypes.bool,
  isFavourite: PropTypes.bool,
  showStatus: PropTypes.bool,
};
