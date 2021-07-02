import React from 'react';
import { Link } from 'react-router-dom';

import EnvironmentIngress from './environment-ingress';

import RelativeToNow from '../time/relative-to-now';

import { routeWithParams, smallDeploymentName } from '../../utils/string';
import routes from '../../routes';
import JobStatusChip from '../job-status-chip';
import { Icon, Button, Typography } from '@equinor/eds-core-react';
import { send, link } from '@equinor/eds-icons';

const activeDeployment = (appName, env) => {
  if (!env.activeDeployment) {
    return (
      <Button variant="ghost" fullWidth disabled>
        <span>
          <Icon data={send} /> No active deployment
        </span>
      </Button>
    );
  }

  const deploymentName = env.activeDeployment.name;

  return (
    <Button
      variant="ghost"
      href={routeWithParams(routes.appDeployment, { appName, deploymentName })}
      fullWidth
      className="deployment"
    >
      <Icon data={send} />
      <span>
        {smallDeploymentName(deploymentName)}
        <span className="timestamp">
          (<RelativeToNow time={env.activeDeployment.activeFrom} />)
        </span>
      </span>
    </Button>
  );
};

const builtFrom = (env) => {
  if (!env.branchMapping) {
    return (
      <Typography variant="body_short">Not built automatically</Typography>
    );
  }

  return (
    <Typography variant="body_short">
      Built from {env.branchMapping} branch
    </Typography>
  );
};

const EnvironmentCard = ({ appName, env }) => {
  const activeDeploymentName =
    env && env.activeDeployment ? env.activeDeployment.name : null;

  return (
    <div className="env_card">
      <div className="env_card_header">
        <div className="header">
          <h6>
            <Link
              to={routeWithParams(routes.appEnvironment, {
                appName,
                envName: env.name,
              })}
            >
              {env.name}
            </Link>
          </h6>
          <JobStatusChip>TBA</JobStatusChip>
        </div>
      </div>
      <div className="env_card_content">
        {env.status === 'Orphan' && <em>Orphan environment</em>}
        {activeDeploymentName ? (
          <EnvironmentIngress
            appName={appName}
            deploymentName={activeDeploymentName}
            envName={env.name}
          />
        ) : (
          <Button variant="ghost" fullWidth disabled>
            <span>
              <Icon data={link} /> No link available
            </span>
          </Button>
        )}
        {activeDeployment(appName, env)}
        {builtFrom(env)}
        <div className="env_actions">
          <Button disabled>Start</Button>
          <Button disabled>Stop</Button>
          <Button variant="ghost" disabled>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentCard;
