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
import { HTMLAttributes, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { AppBadge } from '../app-badge';
import { EnvironmentCardStatus } from '../environments-summary/environment-card-status';
import {
  aggregateComponentEnvironmentStatus,
  aggregateReplicaEnvironmentStatus,
  EnvironmentStatus,
} from '../environments-summary/environment-status-utils';
import {
  ApplicationSummaryModel,
  ApplicationSummaryModelValidationMap,
} from '../../models/application-summary';
import { ComponentModel } from '../../models/component';
import { ProgressStatus } from '../../models/progress-status';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

import './style.css';

export type FavouriteClickedHandler = (
  event: MouseEvent<HTMLButtonElement>,
  name: string
) => void;

export interface AppListItemProps {
  app: ApplicationSummaryModel;
  handler: FavouriteClickedHandler;
  isPlaceholder?: boolean;
  isFavourite?: boolean;
  showStatus?: boolean;
}

const latestJobStatus: Partial<Record<ProgressStatus, EnvironmentStatus>> = {
  [ProgressStatus.Failed]: EnvironmentStatus.Danger,
  [ProgressStatus.DeadlineExceeded]: EnvironmentStatus.Warning,
  [ProgressStatus.Unknown]: EnvironmentStatus.Warning,
};

function aggregateEnvironmentStatus(
  components: Array<ComponentModel>
): EnvironmentStatus {
  return Math.max(
    aggregateComponentEnvironmentStatus(components),
    aggregateReplicaEnvironmentStatus(
      components?.reduce<Array<ReplicaSummaryNormalizedModel>>(
        (obj, { replicaList }) =>
          !replicaList ? obj : [...obj, ...replicaList],
        []
      )
    )
  );
}

const AppItemStatus = ({
  app,
}: {
  app: ApplicationSummaryModel;
}): JSX.Element => {
  const { environmentActiveComponents, latestJob } = app;

  const time =
    latestJob &&
    (latestJob.status === ProgressStatus.Running || !latestJob.ended
      ? latestJob.started
      : latestJob.ended);

  return (
    <div className="grid grid--gap-small">
      <div className="app-list-status--last-job grid--gap-small">
        <div>
          {time && (
            <div className="grid grid--gap-small grid--auto-columns">
              <Typography variant="caption">
                {formatDistanceToNow(time, { addSuffix: true })}
              </Typography>
              {latestJob &&
                (latestJob.status === ProgressStatus.Running ||
                  latestJob.status === ProgressStatus.Stopping) && (
                  <CircularProgress size={16} />
                )}
            </div>
          )}
        </div>

        <div>
          {(environmentActiveComponents || latestJob) && (
            <EnvironmentCardStatus
              statusElements={{
                ...(latestJob && {
                  'Latest Job':
                    latestJobStatus[latestJob.status] ??
                    EnvironmentStatus.Consistent,
                }),
                ...(environmentActiveComponents && {
                  Environments: aggregateEnvironmentStatus(
                    Object.keys(environmentActiveComponents ?? {}).reduce(
                      (obj, x) => [...obj, ...environmentActiveComponents[x]],
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
  );
};

const WElement = ({
  app,
  isPlaceholder,
  ...rest
}: {
  app: ApplicationSummaryModel;
  isPlaceholder?: boolean;
} & HTMLAttributes<
  Pick<
    HTMLAnchorElement | HTMLDivElement,
    keyof HTMLAnchorElement & keyof HTMLDivElement
  >
>): JSX.Element =>
  isPlaceholder ? (
    <div {...rest} />
  ) : (
    <Link to={routeWithParams(routes.app, { appName: app.name })} {...rest} />
  );

export const AppListItem = ({
  app,
  handler,
  isPlaceholder,
  isFavourite,
  showStatus,
}: AppListItemProps): JSX.Element => (
  <WElement
    className={clsx('app-list-item', {
      'app-list-item--placeholder': isPlaceholder,
    })}
    app={app}
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
        {showStatus && <AppItemStatus app={app} />}
      </div>
    </div>
  </WElement>
);

AppListItem.propTypes = {
  app: PropTypes.shape(ApplicationSummaryModelValidationMap).isRequired,
  handler: PropTypes.func.isRequired,
  isPlaceholder: PropTypes.bool,
  isFavourite: PropTypes.bool,
  showStatus: PropTypes.bool,
} as PropTypes.ValidationMap<AppListItemProps>;
