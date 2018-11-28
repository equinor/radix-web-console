import { Link } from 'react-router-dom';
import classnames from 'classnames';
import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import jobStatuses from '../../state/applications/job-statuses';

import './style.css';

const LatestJobSummary = ({ app }) => {
  if (!app || !app.latestJob || !app.latestJob.started) {
    return 'Latest: None';
  }

  const timeSince = distanceInWordsToNow(new Date(app.latestJob.started));

  return (
    <React.Fragment>
      <div>Latest: {app.latestJob.status}</div>
      <div>{timeSince}</div>
    </React.Fragment>
  );
};

export const AppSummaryShort = ({ app }) => {
  const status = (app.latestJob && app.latestJob.status) || jobStatuses.IDLE;

  const appRoute = routeWithParams(routes.app, { appName: app.name });

  const className = classnames({
    'app-summary': true,
    'app-summary-short': true,
    'app-summary--success': status === jobStatuses.SUCCEEDED,
    'app-summary--building': status === jobStatuses.RUNNING,
    'app-summary--failed': status === jobStatuses.FAILED,
    'app-summary--unknown':
      status === jobStatuses.IDLE || status === jobStatuses.PENDING,
  });

  return (
    <section className={className}>
      <Link
        className="app-summary__tile app-summary-short__title"
        to={appRoute}
      >
        <div className="app-summary-short__title__text">{app.name}</div>
        <div className="app-summary-short__title__status">
          <LatestJobSummary app={app} />
        </div>
      </Link>
    </section>
  );
};

export default AppSummaryShort;
