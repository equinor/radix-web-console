import { EnvironmentSummary } from 'radix-web-console-models';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Clickbox from '../clickbox';

import { routeWithParams, themedColor } from '../../utils/string';
import routes from '../../routes';

const activeDeployment = (appName, env) => {
  if (!env.activeDeployment) {
    return <em>No active deployment</em>;
  }

  return (
    <div>
      <NavLink to={routeWithParams(routes.appDeployments, { appName })}>
        {env.activeDeployment.name}
      </NavLink>{' '}
      deployed {env.activeDeployment.activeFrom}
    </div>
  );
};

const builtFrom = env => {
  if (!env.branchMapping) {
    return <em>Not built automatically</em>;
  }

  return (
    <div>
      Built from <strong>{env.branchMapping}</strong> branch
    </div>
  );
};

export const EnvironmentsSummary = ({ appName, envs }) => (
  <ul className="envs-summary">
    {envs.map(env => (
      <li key={env.name}>
        <Clickbox>
          <div className="envs-summary__env">
            <h2
              className="envs-summary__env-title"
              style={{ backgroundColor: themedColor(env.name) }}
            >
              <NavLink
                to={routeWithParams(routes.appEnvironment, {
                  appName,
                  envName: env.name,
                })}
              >
                {env.name}
              </NavLink>
            </h2>
            <div className="envs-summary__env-body">
              {builtFrom(env)}
              {activeDeployment(appName, env)}
            </div>
          </div>
        </Clickbox>
      </li>
    ))}
  </ul>
);

EnvironmentsSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummary)).isRequired,
};

export default EnvironmentsSummary;
