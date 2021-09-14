import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { star_filled, star_outlined } from '@equinor/eds-icons';
import classnames from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React from 'react';
import { Link } from 'react-router-dom';

import AppBadge from '../app-badge';
import { StatusBadge } from '../status-badge';
import routes from '../../routes';
import jobStatuses from '../../state/applications/job-statuses';
import { routeWithParams } from '../../utils/string';

import './style.css';

const LatestJobSummary = ({ app }) => {
  if (!app || !app.latestJob || !app.latestJob.started) {
    return (
      <>
        <div className="app-list--details-info">
          <Typography variant="h6">{app.name}</Typography>
        </div>
        {app.name && <StatusBadge type="warning">Unknown</StatusBadge>}
      </>
    );
  }

  const fromTime =
    app.latestJob.status === jobStatuses.RUNNING || !app.latestJob.ended
      ? app.latestJob.started
      : app.latestJob.ended;
  const timeSince = formatDistanceToNow(new Date(fromTime), {
    addSuffix: true,
  });

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
};

const FavouriteButton = ({ app, handler, isFavourite }) => {
  return (
    <Button variant="ghost_icon" onClick={(e) => handler(e, app.name)}>
      <Icon data={isFavourite ? star_filled : star_outlined} size="24" />
    </Button>
  );
};

export const AppListItem = ({ app, handler, isFavourite }) => {
  const appRoute = routeWithParams(routes.app, { appName: app.name });
  const className = classnames('app-list-item', {
    'app-list-item--placeholder': app.isPlaceHolder,
  });
  const WElement = app.isPlaceHolder ? 'div' : Link;

  return (
    <div className={className}>
      <WElement className="app-list-item--area" to={appRoute}>
        <div className="app-list-item--area-content">
          <div className="app-list-item--area-icon">
            {!app.isPlaceHolder && <AppBadge appName={app.name} size="40" />}
          </div>
          <div className="app-list-item--area-details">
            <LatestJobSummary app={app} />
          </div>
        </div>
        {!app.isPlaceHolder && (
          <FavouriteButton
            app={app}
            handler={handler}
            isFavourite={isFavourite}
          />
        )}
      </WElement>
    </div>
  );
};

export default AppListItem;
