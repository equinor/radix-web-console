import {
  Button,
  CircularProgress,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import {
  engineering,
  IconData,
  star_filled,
  star_outlined,
} from '@equinor/eds-icons';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import * as PropTypes from 'prop-types';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { AppBadge } from '../app-badge';
import {
  StatusTooltipTemplate,
  StatusTooltipTemplateProps,
  StatusTooltipTemplateType,
} from '../status-tooltips/status-tooltip-template';
import {
  ApplicationSummaryModel,
  ApplicationSummaryModelValidationMap,
} from '../../models/application-summary';
import { ProgressStatus } from '../../models/progress-status';
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

const latestJobStatus: Partial<
  Record<ProgressStatus, StatusTooltipTemplateType>
> = {
  [ProgressStatus.Failed]: 'danger',
  [ProgressStatus.DeadlineExceeded]: 'warning',
  [ProgressStatus.Unknown]: 'warning',
};

const AppItemStatus = ({
  app,
}: {
  app: ApplicationSummaryModel;
}): JSX.Element => {
  const { latestJob } = app;

  const time =
    latestJob &&
    (latestJob.status === ProgressStatus.Running || !latestJob.ended
      ? latestJob.started
      : latestJob.ended);

  const status: Array<
    { icon: IconData } & Pick<StatusTooltipTemplateProps, 'title' | 'type'>
  > = [
    {
      title: 'Pipeline Run (latest)',
      icon: engineering,
      type: latestJobStatus[latestJob?.status] ?? 'none',
    },
  ];

  return (
    <div className="grid grid--gap-small">
      {time && (
        <div className="app-list-status--last-job">
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

      <div className="grid grid--gap-x-small grid--auto-columns">
        {status.map(({ icon, ...rest }, i) => (
          <StatusTooltipTemplate
            key={i}
            placement="bottom"
            icon={<Icon data={icon} />}
            {...rest}
          />
        ))}
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
} & React.HTMLAttributes<
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
    className={classNames('app-list-item', {
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
