import { Button, Divider, Icon, Typography } from '@equinor/eds-core-react';
import { link, send } from '@equinor/eds-icons';
import React from 'react';
import { Link } from 'react-router-dom';

import EnvironmentIngress from './environment-ingress';
import RelativeToNow from '../time/relative-to-now';
import routes from '../../routes';
import { routeWithParams } from '../../utils/string';

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
  return (
    <Typography group="ui" variant="chip__badge">
      {!env.branchMapping
        ? 'Not built automatically'
        : `Built from ${env.branchMapping} branch`}
    </Typography>
  );
};

const EnvironmentCard = ({ appName, env }) => {
  const activeDeploymentName =
    env && env.activeDeployment ? env.activeDeployment.name : null;

  return (
    <div className="env_card">
      <div className="env_card_header">
        <Typography variant="accordion_header" group="ui">
          <Link
            to={routeWithParams(routes.appEnvironment, {
              appName,
              envName: env.name,
            })}
          >
            <Typography link as="span" token={{ textDecoration: 'none' }}>
              {env.name}
            </Typography>
          </Link>
        </Typography>
      </div>
      <Divider variant="small" />
      <div className="env_card_content">
        {env.status === 'Orphan' && (
          <Typography
            group="ui"
            variant="chip__badge"
            token={{ fontStyle: 'italic' }}
          >
            Orphan environment
          </Typography>
        )}
        {activeDeploymentName ? (
          <EnvironmentIngress
            appName={appName}
            deploymentName={activeDeploymentName}
            envName={env.name}
          />
        ) : (
          <Button className="button_link" variant="ghost" disabled>
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
