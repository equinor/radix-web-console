import { Link } from 'react-router-dom';
import classnames from 'classnames';
import React from 'react';

import EnvDetails from './environment-details';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import buildStatuses from '../../state/applications/build-statuses';

import './style.css';

export const AppSummary = ({ app, showAllEnvs = false }) => {
  let numberOfEnvs = 0;
  let envsToDisplay = app.spec.environments || [];

  const status = app.buildStatus || buildStatuses.IDLE;

  if (!showAllEnvs && app.spec.environments) {
    numberOfEnvs = app.spec.environments.length;
    if (app.spec.environments.length < 4) {
      envsToDisplay = app.spec.environments;
    } else {
      // If there are more than 3 envs, we should only display 2 of them
      envsToDisplay = app.spec.environments.slice(0, 2);
    }
  }

  const appRoute = routeWithParams(routes.app, { appName: app.metadata.name });

  const className = classnames({
    'app-summary': true,
    'app-summary--all-envs': showAllEnvs,
    'app-summary--success': status === buildStatuses.SUCCESS,
    'app-summary--building': status === buildStatuses.BUILDING,
    'app-summary--failed': status === buildStatuses.FAILURE,
    'app-summary--unknown': status === buildStatuses.IDLE,
  });

  return (
    <section className={className}>
      <Link className="app-summary__tile" to={appRoute}>
        <h2 className="app-summary__title">{app.metadata.name}</h2>
        <div className="app-summary__tile-content">{status}</div>
      </Link>
      {app.spec.environments &&
        envsToDisplay.map(env => (
          <EnvDetails
            appName={app.metadata.name}
            env={env}
            components={app.spec.components}
            key={env.name}
          />
        ))}
      {app.spec.environments &&
        envsToDisplay.length < numberOfEnvs && (
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
