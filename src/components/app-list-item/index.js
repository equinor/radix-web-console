import { Link } from 'react-router-dom';
import classnames from 'classnames';
import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import jdenticon from 'jdenticon';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import jobStatuses from '../../state/applications/job-statuses';

import './style.css';

const LatestJobSummary = ({ app }) => {
  if (!app || !app.latestJob || !app.latestJob.started) {
    return null;
  }
  const timeSince = distanceInWordsToNow(new Date(app.latestJob.started));
  return `Latest: ${app.latestJob.status} (${timeSince})`;
};

export const AppListItem = ({ app }) => {
  const status = (app.latestJob && app.latestJob.status) || jobStatuses.IDLE;

  const appRoute = routeWithParams(routes.app, { appName: app.name });

  const className = classnames({
    'app-list-item__area': true,
    'app-list-item__area--success': status === jobStatuses.SUCCEEDED,
    'app-list-item__area--building': status === jobStatuses.RUNNING,
    'app-list-item__area--failed': status === jobStatuses.FAILED,
    'app-list-item__area--unknown':
      status === jobStatuses.IDLE || status === jobStatuses.PENDING,
  });

  const icon = {
    __html: jdenticon.toSvg(app.name, 100)
  };

  return (
    <div className="app-list-item">
      <Link className={className} to={appRoute}>
        <div
          className="app-list-item__area__icon"
          dangerouslySetInnerHTML={icon}
        />
        <div className="app-list-item__area__name">{app.name}</div>
        <div className="app-list-item__area__status">
          <LatestJobSummary app={app} />
        </div>
      </Link>
    </div>
  );
};

export default AppListItem;
