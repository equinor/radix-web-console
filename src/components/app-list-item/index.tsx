import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { star_filled, star_outlined } from '@equinor/eds-icons';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import * as PropTypes from 'prop-types';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { AppBadge } from '../app-badge';
import { StatusBadge } from '../status-badges';
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

const LatestJobSummary = ({
  app,
}: {
  app: ApplicationSummaryModel;
}): JSX.Element => {
  if (!app?.latestJob?.started) {
    return <StatusBadge type="warning">Unknown</StatusBadge>;
  }

  const time =
    app.latestJob.status === ProgressStatus.Running || !app.latestJob.ended
      ? app.latestJob.started
      : app.latestJob.ended;
  const timeSince = formatDistanceToNow(time, { addSuffix: true });

  return (
    <div className="grid grid--gap-small">
      <Typography variant="caption">{timeSince}</Typography>
      <StatusBadge type={app.latestJob.status}>
        {app.latestJob.status}
      </StatusBadge>
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
  <div
    className={classNames('app-list-item', {
      'app-list-item--placeholder': isPlaceholder,
    })}
  >
    <WElement
      className="app-list-item--area"
      app={app}
      isPlaceholder={isPlaceholder}
    >
      <div className="app-list-item--area-content">
        <div className="app-list-item--area-icon">
          {!isPlaceholder && <AppBadge appName={app.name} size={40} />}
        </div>
        <div className="app-list-item--area-details">
          <div className="app-list-item--details-info">
            <Typography variant="h6" className="app-list-item--title">
              {app.name}
            </Typography>
            {showStatus && <LatestJobSummary app={app} />}
          </div>
        </div>
      </div>
      {!isPlaceholder && (
        <div>
          <Button variant="ghost_icon" onClick={(e) => handler(e, app.name)}>
            <Icon data={isFavourite ? star_filled : star_outlined} size={24} />
          </Button>
        </div>
      )}
    </WElement>
  </div>
);

AppListItem.propTypes = {
  app: PropTypes.shape(ApplicationSummaryModelValidationMap).isRequired,
  handler: PropTypes.func.isRequired,
  isPlaceholder: PropTypes.bool,
  isFavourite: PropTypes.bool,
  showStatus: PropTypes.bool,
} as PropTypes.ValidationMap<AppListItemProps>;
