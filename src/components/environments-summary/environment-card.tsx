import { Button, Divider, Icon, Typography } from '@equinor/eds-core-react';
import { link, send } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  EnvironmentCardStatus,
  EnvironmentCardStatusMap,
} from './environment-card-status';
import { EnvironmentIngress } from './environment-ingress';
import {
  aggregateComponentEnvironmentStatus,
  aggregateReplicaEnvironmentStatus,
  aggregateVulnerabilityEnvironmentStatus,
  environmentVulnerabilitySummarizer,
} from './environment-status-utils';
import { useGetComponents } from './use-get-components';

import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { useGetEnvironmentScans } from '../page-environment/use-get-environment-scans';
import { RelativeToNow } from '../time/relative-to-now';
import { ConfigurationStatus } from '../../models/configuration-status';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/environment-summary';
import { ReplicaSummaryNormalizedModel } from '../../models/replica-summary';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

import './style.css';

type CardContent = { header: JSX.Element; body: JSX.Element };

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
  const [envScanState] = useGetEnvironmentScans(appName, envName);
  const [componentsState] = useGetComponents(appName, deploymentName);

  const vulnerabilities = environmentVulnerabilitySummarizer(envScanState.data);
  const components = componentsState.data ?? [];
  const replicas = components.reduce<Array<ReplicaSummaryNormalizedModel>>(
    (obj, { replicaList }) => (!replicaList ? obj : [...obj, ...replicaList]),
    []
  );

  const elements: EnvironmentCardStatusMap = {
    Components: aggregateComponentEnvironmentStatus(components),
    ...(replicas.length > 0 && {
      Replicas: aggregateReplicaEnvironmentStatus(replicas),
    }),
    Vulnerabilities: aggregateVulnerabilityEnvironmentStatus([vulnerabilities]),
  };

  const statusElement = (
    <SimpleAsyncResource asyncState={componentsState} customError={<></>}>
      {components.length > 0 && (
        <EnvironmentCardStatus statusElements={elements} />
      )}
    </SimpleAsyncResource>
  );

  return {
    header: (
      <div className="env_card-header_badges grid grid--auto-columns grid--gap-x-small">
        <SimpleAsyncResource
          asyncState={envScanState}
          customError={statusElement}
          children={statusElement}
        />
      </div>
    ),
    body: (
      <SimpleAsyncResource asyncState={componentsState} customError={<></>}>
        <EnvironmentIngress {...{ appName, envName, components }} />
      </SimpleAsyncResource>
    ),
  };
}

export const EnvironmentCard = ({
  appName,
  env,
}: EnvironmentCardProps): JSX.Element => {
  const { header, body }: CardContent = !env.activeDeployment?.name
    ? {
        header: <></>,
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
      <div className="env_card-header">
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

        {header}
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

        {body}
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
