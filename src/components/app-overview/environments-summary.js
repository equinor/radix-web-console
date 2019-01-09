import { EnvironmentSummary } from 'radix-web-console-models';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

export const EnvironmentsSummary = ({ appName, envs }) => (
  <ul className="envs-summary">
    {envs.map(env => (
      <li key={env.name}>
        <div className="envs-summary__env">
          <h2 className="envs-summary__env-title">
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
            {env.branchMapping && (
              <div>
                Built from <strong>{env.branchMapping}</strong>
              </div>
            )}
            {env.activeDeployment && (
              <div>
                <NavLink
                  to={routeWithParams(routes.appDeployments, {
                    appName,
                  })}
                >
                  {env.activeDeployment.name}
                </NavLink>{' '}
                deployed {env.activeDeployment.activeFrom}
              </div>
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
);

EnvironmentsSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummary)).isRequired,
};

export default EnvironmentsSummary;
