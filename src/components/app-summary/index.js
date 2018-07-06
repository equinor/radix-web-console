import React from 'react';

// import { routeWithParams } from '../../utils/string';
// import routes from '../../routes';

// an EnvDetail needs one element from app.spec.environments + a link per
//component OR app.metadata.name + app.spec.components
import EnvDetails from './environment-details';

import './style.css';

export const AppSummary = ({ app }) => {
  var numberOfEnvs = 0;
  var envsToDisplay = [];

  var appStatus = app.buildStatus ? app.buildStatus : 'Waiting';

  if (app.spec.environments) {
    numberOfEnvs = app.spec.environments.length;
    if (app.spec.environments.length < 4) {
      envsToDisplay = app.spec.environments.slice();
    } else {
      // If there are more than 3 envs, we should only display 2 of them
      envsToDisplay = app.spec.environments.slice(0, 2);
    }
  }
  return (
    <React.Fragment>
      <div className="appsummary">
        <div className={'app-env app-env--' + appStatus}>
          <div className="app-env__content">
            <b>{app.metadata.name}</b>
            <div>
              <React.Fragment>
                {' '}
                <br /> Build status: {appStatus}
              </React.Fragment>
            </div>
          </div>
        </div>
        {app.spec.environments &&
          envsToDisplay.map((env, index) => (
            <div
              key={env.name}
              className={'app-env app-env--' + appStatus}
              style={{ '--transparent': 0.25 * index + 0.5 }}
            >
              <EnvDetails
                env={env}
                appName={app.metadata.name}
                components={app.spec.components}
              />
            </div>
          ))}
        {app.spec.environments &&
          envsToDisplay.length < numberOfEnvs && (
            <div
              className={'app-env app-env--' + appStatus}
              style={{ '--transparent': 1.0 }}
            >
              <div className="app-env__content">
                <a href="">
                  <span>
                    +{numberOfEnvs - envsToDisplay.length} environments
                  </span>
                </a>
              </div>
            </div>
          )}
      </div>
    </React.Fragment>
  );
};

export default AppSummary;
