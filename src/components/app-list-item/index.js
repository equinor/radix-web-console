import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import AppBadge from '../app-badge';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import jobStatuses from '../../state/applications/job-statuses';

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
    return null;
  }
  const fromTime =
    app.latestJob.status === jobStatuses.RUNNING || !app.latestJob.ended
      ? app.latestJob.started
      : app.latestJob.ended;
  const timeSince = formatDistanceToNow(new Date(fromTime), {
    addSuffix: true,
  });
  return (
    <div title={app.latestJob.started}>
      Latest: {app.latestJob.status} ({timeSince})
    </div>
  );
};

export const AppListItem = ({ app }) => {
  const status = (app.latestJob && app.latestJob.status) || jobStatuses.IDLE;
  const appRoute = routeWithParams(routes.app, { appName: app.name });

  const className = classnames('app-list-item', {
    'app-list-item--success': status === jobStatuses.SUCCEEDED,
    'app-list-item--building': status === jobStatuses.RUNNING,
    'app-list-item--failed': status === jobStatuses.FAILED,
    'app-list-item--unknown':
      status === jobStatuses.IDLE || status === jobStatuses.PENDING,
    'app-list-item--placeholder': app.isPlaceHolder,
  });

  const WElement = app.isPlaceHolder ? 'div' : Link;

  return (
    <div className={className}>
      <WElement className="app-list-item__area" to={appRoute}>
        <div className="app-list-item__area-icon">
          <AppBadge appName={app.name} />
        </div>
        <div className="app-list-item__area-details">
          <div className="app-list-item__area-name" title={app.name}>
            {app.name}
          </div>
          <LatestJobSummary app={app} />
          <GitSummary app={app} />
        </div>
      </WElement>
    </div>
  );
};

export default AppListItem;
