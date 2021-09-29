import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { star_filled, star_outlined } from '@equinor/eds-icons';
import classnames from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { AppBadge } from '../app-badge';
import { StatusBadge } from '../status-badge';
import applicationSummaryModel from '../../models/application-summary';
import { routes } from '../../routes';
import jobStatuses from '../../state/applications/job-statuses';
import { routeWithParams } from '../../utils/string';

import './style.css';

export type FavouriteClickedHandler = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string
) => void;

export type AppListItemProps = {
  app: typeof applicationSummaryModel;
  handler: FavouriteClickedHandler;
  isPlaceholder?: boolean;
  isFavourite?: boolean;
};

function LatestJobSummary(app: typeof applicationSummaryModel): JSX.Element {
  if (!app?.latestJob?.started) {
    return (
      <>
        <div className="app-list--details-info">
          <Typography variant="h6">{app.name}</Typography>
        </div>
        {app.name && <StatusBadge type="warning">Unknown</StatusBadge>}
      </>
    );
  }

  const time =
    app.latestJob.status === jobStatuses.RUNNING || !app.latestJob.ended
      ? app.latestJob.started
      : app.latestJob.ended;
  const timeSince = formatDistanceToNow(new Date(time), { addSuffix: true });

  return (
    <>
      <div className="app-list--details-info">
        <Typography variant="h6" className="app-list-item--title">
          {app.name}
        </Typography>
        <Typography variant="caption">{timeSince}</Typography>
      </div>
      <StatusBadge type={app.latestJob.status}>
        {app.latestJob.status}
      </StatusBadge>
    </>
  );
}

function FavouriteButton(
  app: typeof applicationSummaryModel,
  handler: FavouriteClickedHandler,
  isFavourite: boolean
): JSX.Element {
  return (
    <Button variant="ghost_icon" onClick={(e) => handler(e, app.name)}>
      <Icon data={isFavourite ? star_filled : star_outlined} size={24} />
    </Button>
  );
}

export const AppListItem = (props: AppListItemProps): JSX.Element => {
  const appRoute = routeWithParams(routes.app, { appName: props.app.name });
  const className = classnames('app-list-item', {
    'app-list-item--placeholder': props.isPlaceholder,
  });
  const WElement: any = props.isPlaceholder ? 'div' : Link;

  return (
    <div className={className}>
      <WElement className="app-list-item--area" to={appRoute}>
        <div className="app-list-item--area-content">
          <div className="app-list-item--area-icon">
            {!props.isPlaceholder && (
              <AppBadge appName={props.app.name} size={40} />
            )}
          </div>
          <div className="app-list-item--area-details">
            {LatestJobSummary(props.app)}
          </div>
        </div>
        {!props.isPlaceholder && (
          <>{FavouriteButton(props.app, props.handler, props.isFavourite)}</>
        )}
      </WElement>
    </div>
  );
};

export default AppListItem;
