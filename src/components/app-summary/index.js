import { Link } from 'react-router-dom';
import classnames from 'classnames';
import React from 'react';

import EnvDetails from './environment-details';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import jobStatuses from '../../state/applications/job-statuses';

import './style.css';

export const AppSummary = ({ app, oldApp, showAllEnvs = false }) => {
  let numberOfEnvs = 0;
  let envsToDisplay = app.environments || [];

  const status = app.jobStatus || jobStatuses.IDLE;

  if (!showAllEnvs && app.environments) {
    numberOfEnvs = app.environments.length;
    if (app.environments.length < 4) {
      envsToDisplay = app.environments;
    } else {
      // If there are more than 3 envs, we should only display 2 of them
      envsToDisplay = app.environments.slice(0, 2);
    }
  }

  const appRoute = routeWithParams(routes.app, { appName: app.name });

  const className = classnames({
    'app-summary': true,
    'app-summary--all-envs': showAllEnvs,
    'app-summary--success': status === jobStatuses.SUCCEEDED,
    'app-summary--building': status === jobStatuses.RUNNING,
    'app-summary--failed': status === jobStatuses.FAILED,
    'app-summary--unknown':
      status === jobStatuses.IDLE || status === jobStatuses.PENDING,
  });

  return (
    <section className={className}>
      <Link className="app-summary__tile" to={appRoute}>
        <h2 className="app-summary__title">{app.name}</h2>
        <div className="app-summary__tile-content">Latest: {status}</div>
      </Link>
      {app.environments &&
        envsToDisplay.map(env => (
          <EnvDetails
            appName={app.name}
            env={env}
            components={oldApp.spec.components}
            key={env.name}
          />
        ))}
      {app.environments && envsToDisplay.length < numberOfEnvs && (
        <div className="app-summary__tile">
          <Link className="app-summary__tile-single-link" to={appRoute}>
            +{numberOfEnvs - envsToDisplay.length} environments
          </Link>
        </div>
      )}
    </section>
  );
};

export default AppSummary;
