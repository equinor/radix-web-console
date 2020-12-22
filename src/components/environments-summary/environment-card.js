import React from 'react';
import { Link } from 'react-router-dom';

import EnvironmentIngress from './environment-ingress';

import Clickbox from '../clickbox';
import RelativeToNow from '../time/relative-to-now';

import {
  routeWithParams,
  smallDeploymentName,
  themedColor,
} from '../../utils/string';
import routes from '../../routes';

const activeDeployment = (appName, env) => {
  if (!env.activeDeployment) {
    return <div>No active deployment</div>;
  }

  const deploymentName = env.activeDeployment.name;

  return (
    <div>
      <Link
        to={routeWithParams(routes.appDeployment, { appName, deploymentName })}
      >
        {smallDeploymentName(deploymentName)}
      </Link>
      <br />
      deployed <RelativeToNow time={env.activeDeployment.activeFrom} />
    </div>
  );
};

const outdatedDeployment = (appName, env) => {
  if (!env.activeDeployment) {
    return <div>No active deployment</div>;
  }

  const activeDeployment = env.activeDeployment;

  if (activeDeployment.status === 'Outdated') {
    return <h3>One or more components are outdated</h3>;
  }
};

const builtFrom = (env) => {
  if (!env.branchMapping) {
    return (
      <div>
        <br />
        Not built automatically
      </div>
    );
  }

  return (
    <div>
      <br />
      built from <strong>{env.branchMapping}</strong> branch
    </div>
  );
};

const EnvironmentCard = ({ appName, env }) => {
  const activeDeploymentName =
    env && env.activeDeployment ? env.activeDeployment.name : null;

  return (
    <Clickbox>
      <div className={`env-summary env-summary--${env.status.toLowerCase()}`}>
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
        {outdatedDeployment(appName, env)}
        <div className="env-summary__body">
          {env.status === 'Orphan' && <em>Orphan environment</em>}
          {activeDeploymentName ? (
            <EnvironmentIngress
              appName={appName}
              deploymentName={activeDeploymentName}
            />
          ) : (
            <div />
          )}
          <div>
            {activeDeployment(appName, env)}
            {builtFrom(env)}
          </div>
        </div>
      </div>
    </Clickbox>
  );
};

export default EnvironmentCard;
