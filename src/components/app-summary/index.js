import React from 'react';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import { Link } from 'react-router-dom';
import EnvDetails from './environment-details';

import './style.css';

export const AppSummary = ({ app }) => {
  var numberOfEnvs = 0;
  var envsToDisplay = [];

  var appStatus = app.buildStatus ? app.buildStatus : 'Waiting';

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
    <React.Fragment>
      <div className="appsummary">
        <div
          className={
            'appsummary__block appsummary__block--' +
            appStatus
          }
        >
          <Link to={routeWithParams(routes.app, { id: app.metadata.name })}>
            {app.metadata.name}
          </Link>
          <div>
            <React.Fragment>Build status: {appStatus}</React.Fragment>
          </div>
        </div>
        {app.spec.environments &&
          envsToDisplay.map((env, index) => (
            <div
              key={env.name}
              className={
                'appsummary__block appsummary__block--' +
                appStatus
              }
              style={{ '--transparent': 0.25 * index + 0.5 }}
            >
              <EnvDetails
                env={env}
                index={index}
                appName={app.metadata.name}
                components={app.spec.components}
              />
            </div>
          ))}
        {app.spec.environments &&
          envsToDisplay.length < numberOfEnvs && (
            <div
              className={
                'appsummary__block appsummary__block--' +
                appStatus
              }
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
      </div>
    </React.Fragment>
  );
};

export default AppSummary;
