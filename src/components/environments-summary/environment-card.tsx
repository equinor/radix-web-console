import { Button, Divider, Icon, Typography } from '@equinor/eds-core-react';
import { link, send } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { EnvironmentIngress } from './environment-ingress';
import { useGetComponents } from './use-get-components';

import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { RelativeToNow } from '../time/relative-to-now';
import { ConfigurationStatus } from '../../models/configuration-status';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/environment-summary';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

import './style.css';

type CardContent = { body: JSX.Element };

export interface EnvironmentCardProps {
  appName: string;
  env: EnvironmentSummaryModel;
}

const activeDeployment = (
  appName: string,
  env: EnvironmentSummaryModel
): JSX.Element =>
  !env.activeDeployment ? (
    <Button className="button_link" variant="ghost" disabled>
      <Icon data={send} />{' '}
      <Typography group="navigation" variant="button" color="inherit">
        No active deployment
      </Typography>
    </Button>
  ) : (
    <Button
      className="button_link"
      variant="ghost"
      href={routeWithParams(routes.appDeployment, {
        appName: appName,
        deploymentName: env.activeDeployment.name,
      })}
    >
      <Icon data={send} />
      <Typography group="navigation" variant="button" color="primary">
        deployment{' '}
        <Typography group="navigation" variant="button" as="span" color="gray">
          (<RelativeToNow time={env.activeDeployment.activeFrom} />)
        </Typography>
      </Typography>
    </Button>
  );

function CardContentBuilder(
  appName: string,
  envName: string,
  deploymentName: string
): CardContent {
  const [componentsState] = useGetComponents(appName, deploymentName);
  return {
    body: (
      <SimpleAsyncResource
        asyncState={componentsState}
        customError={componentsState.error}
      >
        {componentsState.data && (
          <EnvironmentIngress
            appName={appName}
            envName={envName}
            components={componentsState.data}
          />
        )}
      </SimpleAsyncResource>
    ),
  };
}

export const EnvironmentCard = ({
  appName,
  env,
}: EnvironmentCardProps): JSX.Element => {
  const elements: CardContent = !env.activeDeployment?.name
    ? {
        body: (
          <Button className="button_link" variant="ghost" disabled>
            <Icon data={link} />{' '}
            <Typography group="navigation" variant="button" color="inherit">
              No link available
            </Typography>
          </Button>
        ),
      }
    : CardContentBuilder(appName, env.name, env.activeDeployment.name);

  return (
    <div className="env_card">
      <div className="env_card_header">
        <div>
          <Link
            to={routeWithParams(routes.appEnvironment, {
              appName: appName,
              envName: env.name,
            })}
          >
            <Typography
              group="ui"
              variant="accordion_header"
              as="span"
              color="primary"
            >
              {env.name}
            </Typography>
          </Link>
        </div>
      </div>

      <Divider variant="small" />

      <div className="env_card_content grid grid--gap-medium">
        {env.status === ConfigurationStatus.Orphan && (
          <Typography
            group="ui"
            variant="chip__badge"
            token={{ fontStyle: 'italic' }}
          >
            Orphan environment
          </Typography>
        )}

        {elements.body}
        {activeDeployment(appName, env)}

        <Typography group="ui" variant="chip__badge">
          {!env.branchMapping
            ? 'Not built automatically'
            : `Built from ${env.branchMapping} branch`}
        </Typography>
      </div>
    </div>
  );
};

EnvironmentCard.propTypes = {
  appName: PropTypes.string.isRequired,
  env: PropTypes.shape(EnvironmentSummaryModelValidationMap).isRequired,
} as PropTypes.ValidationMap<EnvironmentCardProps>;
