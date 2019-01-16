import { Link } from 'react-router-dom';
import classnames from 'classnames';
import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import jdenticon from 'jdenticon';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import jobStatuses from '../../state/applications/job-statuses';

import './style.css';

jdenticon.config = {
  hues: [207, 283, 64],
  lightness: {
    color: [0.45, 0.45],
    grayscale: [0.5, 0.75],
  },
  saturation: {
    color: 0.47,
    grayscale: 0.5,
  },
  backColor: '#ffffff00',
};

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
  const timeSince = distanceInWordsToNow(new Date(app.latestJob.started), {
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
  });

  const icon = {
    __html: jdenticon.toSvg(app.name, 64),
  };

  return (
    <div className={className}>
      <Link className="app-list-item__area" to={appRoute}>
        <div
          className="app-list-item__area-icon"
          dangerouslySetInnerHTML={icon}
        />
        <div className="app-list-item__area-details">
          <div className="app-list-item__area-name" title={app.name}>
            {app.name}
          </div>
          <LatestJobSummary app={app} />
          <GitSummary app={app} />
        </div>
      </Link>
    </div>
  );
};

export default AppListItem;
