import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import AppBadge from '../app-badge';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import jobStatuses from '../../state/applications/job-statuses';

import { Chip, Icon, CircularProgress, Button } from '@equinor/eds-core-react';

import './style.css';
import { star_outlined } from '@equinor/eds-icons';

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
    return (
      <>
        {app.name && (
          <Chip className="status-badge warn" error="true">
            <Icon name="help_outline" />
            Unknown
          </Chip>
        )}
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
  const status = (app.latestJob && app.latestJob.status) || jobStatuses.IDLE;
  const variantName = classnames({
    error: status === jobStatuses.FAILED,
    normal:
      status === jobStatuses.SUCCEEDED ||
      status === jobStatuses.RUNNING ||
      status === jobStatuses.IDLE ||
      status === jobStatuses.PENDING ||
      app.isPlaceHolder,
  });
  const iconName = classnames({
    check: status === jobStatuses.SUCCEEDED,
    settings: status === jobStatuses.RUNNING,
    error_outlined: status === jobStatuses.FAILED,
    help_outline: status === jobStatuses.PENDING,
    pause_circle_outlined:
      status === jobStatuses.IDLE || status === jobStatuses.STOPPED,
    placeholder_icon: app.isPlaceHolder,
  });

  let iconElement;
  if (status === jobStatuses.RUNNING || status === jobStatuses.STOPPING) {
    iconElement = (
      <CircularProgress
        color="primary"
        size={48}
        value={null}
        variant="indeterminate"
      />
    );
  } else {
    iconElement = <Icon name={iconName} />;
  }

  return (
    <p className="caption" title={app.latestJob.started}>
      {timeSince}
      <Chip variant={variantName} className="status-badge">
        {iconElement}
        {app.latestJob.status}
      </Chip>
    </p>
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
