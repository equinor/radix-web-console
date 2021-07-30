import React from 'react';
import { Link } from 'react-router-dom';

import EnvironmentIngress from './environment-ingress';

import RelativeToNow from '../time/relative-to-now';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import { Icon, Button, Typography, Divider } from '@equinor/eds-core-react';
import { send, link } from '@equinor/eds-icons';

const activeDeployment = (appName, env) => {
  if (!env.activeDeployment) {
    return (
      <Button variant="ghost" className="button_link" disabled>
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
      className="deployment button_link"
    >
      <Icon data={send} />
      <span>
        deployment{' '}
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
      <Typography group="ui" variant="chip__badge">
        Not built automatically
      </Typography>
    );
  }

  return (
    <Typography group="ui" variant="chip__badge">
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
        </div>
      </div>
      <Divider variant="small" />
      <div className="env_card_content">
        {env.status === 'Orphan' && (
          <Typography group="ui" variant="chip__badge">
            <em>Orphan environment</em>
          </Typography>
        )}
        {activeDeploymentName ? (
          <EnvironmentIngress
            appName={appName}
            deploymentName={activeDeploymentName}
            envName={env.name}
          />
        ) : (
          <Button variant="ghost" className="button_link" disabled>
            <span>
              <Icon data={link} /> No link available
            </span>
          </Button>
        )}
        {activeDeployment(appName, env)}
        {builtFrom(env)}
      </div>
    </div>
  );
};

export default EnvironmentCard;
