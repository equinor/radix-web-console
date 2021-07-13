import { Button, Icon } from '@equinor/eds-core-react';
import { star_outlined } from '@equinor/eds-icons';
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

const GitSummary = ({ app }) => {
  if (app.latestJob && app.latestJob.branch && app.latestJob.commitID) {
    const commit = app.latestJob.commitID.substr(0, 7);
    return (
      <div className="app-list-item__area-git">
        {app.latestJob.branch} ({commit})
      </div>
    );
  }

  return null;
};

const LatestJobSummary = ({ app }) => {
  if (!app || !app.latestJob || !app.latestJob.started) {
    return <>{app.name && <StatusBadge type="warning">Unknown</StatusBadge>}</>;
  }

  const fromTime =
    app.latestJob.status === jobStatuses.RUNNING || !app.latestJob.ended
      ? app.latestJob.started
      : app.latestJob.ended;
  const timeSince = formatDistanceToNow(new Date(fromTime), {
    addSuffix: true,
  });

  return (
    <div>
      <p className="caption" title={app.latestJob.started}>
        {timeSince}
      </p>
      <StatusBadge type={app.latestJob.status}>
        {app.latestJob.status}
      </StatusBadge>
    </div>
  );
};

export const AppListItem = ({ app }) => {
  const appRoute = routeWithParams(routes.app, { appName: app.name });
  const className = classnames('app-list-item', {
    'app-list-item--placeholder': app.isPlaceHolder,
  });
  const WElement = app.isPlaceHolder ? 'div' : Link;

  return (
    <div className={className}>
      <WElement className="app-list-item__area" to={appRoute}>
        <div className="app-list-item__area-icon">
          <AppBadge appName={app.name} size="40" />
        </div>
        <div className="app-list-item__area-details">
          <h6 className="app-list-item__area-name" title={app.name}>
            {app.name}
          </h6>
          <LatestJobSummary app={app} />
          <GitSummary app={app} />
        </div>
        {!app.isPlaceHolder && (
          // TODO: favourite functionality
          <div className="app-list-item__area-favourite">
            <Button variant="ghost_icon">
              <Icon data={star_outlined} size="24" />
            </Button>
          </div>
        )}
      </WElement>
    </div>
  );
};

export default AppListItem;
