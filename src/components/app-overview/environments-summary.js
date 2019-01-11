import {
  faGlobeAfrica,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EnvironmentSummary } from 'radix-web-console-models';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import EmptyState from '../empty-state';
import Clickbox from '../clickbox';

import './environments-summary.css';

import { routeWithParams, themedColor } from '../../utils/string';
import routes from '../../routes';

const activeDeployment = (appName, env) => {
  if (!env.activeDeployment) {
    return <em>No active deployment</em>;
  }

  return (
    <div>
      <Link to={routeWithParams(routes.appDeployments, { appName })}>
        {env.activeDeployment.name}
      </Link>{' '}
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

const noEnvsIcon = (
  <span className="environments-summary__no-envs-icon fa-layers fa-fw fa-5x">
    <FontAwesomeIcon icon={faGlobeAfrica} />
    <FontAwesomeIcon
      icon={faQuestionCircle}
      transform="shrink-10 down-5 right-5"
    />
  </span>
);

export const EnvironmentsSummary = ({ appName, envs }) => (
  <div className="environments-summary">
    {envs.length === 0 && (
      <EmptyState title="No environments" icon={noEnvsIcon}>
        <p>
          You must define at least one environment in{' '}
          <code>radixconfig.yaml</code>
        </p>
      </EmptyState>
    )}
    {envs.length > 1 && (
      <ul className="env-summary-list">
        {envs.map(env => (
          <li key={env.name}>
            <Clickbox>
              <div className="env-summary">
                <h2
                  className="env-summary__title"
                  style={{ backgroundColor: themedColor(env.name) }}
                >
                  <Link
                    to={routeWithParams(routes.appEnvironment, {
                      appName,
                      envName: env.name,
                    })}
                  >
                    {env.name}
                  </Link>
                </h2>
                <div className="env-summary__body">
                  {builtFrom(env)}
                  {activeDeployment(appName, env)}
                </div>
              </div>
            </Clickbox>
          </li>
        ))}
      </ul>
    )}
  </div>
);

EnvironmentsSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummary)).isRequired,
};

export default EnvironmentsSummary;
