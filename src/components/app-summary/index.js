import React from 'react';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import { Link } from 'react-router-dom';
import EnvDetails from './environment-details';

import './style.css';

const statusClassMap = {
  Succeeded: 'app-summary--success',
  Running: 'app-summary--building',
  Pending: 'app-summary--building',
  Failed: 'app-summary--failed',
};

export const AppSummary = ({ app }) => {
  let numberOfEnvs = 0;
  let envsToDisplay = [];

  const status = app.buildStatus ? app.buildStatus : 'Idle';
  const statusClass = statusClassMap[status] || 'app-summary--unknown';

  if (app.spec.environments) {
    numberOfEnvs = app.spec.environments.length;
    if (app.spec.environments.length < 4) {
      envsToDisplay = app.spec.environments;
    } else {
      // If there are more than 3 envs, we should only display 2 of them
      envsToDisplay = app.spec.environments.slice(0, 2);
    }
  }

  const appRoute = routeWithParams(routes.app, { id: app.metadata.name });

  return (
    <section className={`app-summary ${statusClass}`}>
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
