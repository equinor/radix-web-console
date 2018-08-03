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

  return (
    <section className={`app-summary ${statusClass}`}>
      <Link
        className="app-summary__tile"
        to={routeWithParams(routes.app, { id: app.metadata.name })}
      >
        <h2 className="app-summary__title">{app.metadata.name}</h2>
        <div className="app-summary__tile-content">{status}</div>
      </Link>
      {app.spec.environments &&
        envsToDisplay.map((env, index) => (
          <div key={env.name} className="app-summary__tile">
            <EnvDetails
              env={env}
              index={index}
              appName={app.metadata.name}
              components={app.spec.components}
              appStatus={status}
            />
          </div>
        ))}
      {app.spec.environments &&
        envsToDisplay.length < numberOfEnvs && (
          <div
            className={'app-summary__block app-summary__block--' + status}
            style={{ '--transparent': 1.0 }}
          >
            <Link
              to={routeWithParams(routes.app, {
                id: app.metadata.name,
              })}
            >
              <span>+{numberOfEnvs - envsToDisplay.length} environments</span>
            </Link>
          </div>
        )}
    </section>
  );
};

export default AppSummary;
