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
        <NavLink
          className="envs-summary__env"
          to={routeWithParams(routes.appEnvironment, {
            appName,
            envName: env.name,
          })}
        >
          {env.name}
        </NavLink>
      </li>
    ))}
  </ul>
);

EnvironmentsSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummary)).isRequired,
};

export default EnvironmentsSummary;
