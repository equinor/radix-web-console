import { Button, Divider, Icon, Typography } from '@equinor/eds-core-react';
import { github, link, send } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import {
  EnvironmentCardStatus,
  EnvironmentCardStatusMap,
  EnvironmentVulnerabilityIndicator,
} from './environment-card-status';
import { EnvironmentIngress } from './environment-ingress';
import {
  aggregateComponentEnvironmentStatus,
  aggregateReplicaEnvironmentStatus,
  environmentVulnerabilitySummarizer,
} from './environment-status-utils';
import { useGetComponents } from './use-get-components';

import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { GitTagLinks } from '../git-tags/git-tag-links';
import { useGetEnvironmentScans } from '../page-environment/use-get-environment-scans';
import { RelativeToNow } from '../time/relative-to-now';
import { filterFields } from '../../models/model-utils';
import { DeploymentSummaryModel } from '../../models/radix-api/deployments/deployment-summary';
import { ReplicaSummaryNormalizedModel } from '../../models/radix-api/deployments/replica-summary';
import { ConfigurationStatus } from '../../models/radix-api/environments/configuration-status';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/radix-api/environments/environment-summary';
import { VulnerabilitySummaryModel } from '../../models/scan-api/models/vulnerability-summary';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

import './style.css';

type CardContent = { header: React.JSX.Element; body: React.JSX.Element };

export interface EnvironmentCardProps {
  appName: string;
  env: EnvironmentSummaryModel;
  repository?: string;
}

const visibleKeys: Array<keyof VulnerabilitySummaryModel> = [
  'critical',
  'high',
];

const DeploymentDetails: FunctionComponent<{
  appName: string;
  deployment: DeploymentSummaryModel;
}> = ({ appName, deployment }) =>
  !deployment ? (
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
        deploymentName: deployment.name,
      })}
    >
      <Icon data={send} />
      <Typography group="navigation" variant="button" color="primary">
        deployment{' '}
        <Typography group="navigation" variant="button" as="span" color="gray">
          (<RelativeToNow time={deployment.activeFrom} />)
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
  };

  const statusElement = (
    <SimpleAsyncResource asyncState={componentsState} errorContent={false}>
      {components.length > 0 && (
        <div className="grid grid--gap-x-small grid--auto-columns">
          {visibleKeys.some((key) => vulnerabilities[key] > 0) && (
            <EnvironmentVulnerabilityIndicator
              title="Vulnerabilities"
              size={22}
              summary={filterFields(vulnerabilities, visibleKeys)}
              visibleKeys={visibleKeys}
            />
          )}
          <EnvironmentCardStatus
            title="Environment status"
            statusElements={elements}
          />
        </div>
      )}
    </SimpleAsyncResource>
  );

  return {
    header: (
      <div className="env_card-header_badges grid grid--auto-columns grid--gap-x-small">
        <SimpleAsyncResource
          asyncState={envScanState}
          errorContent={statusElement}
        >
          {statusElement}
        </SimpleAsyncResource>
      </div>
    ),
    body: (
      <SimpleAsyncResource asyncState={componentsState} errorContent={false}>
        <EnvironmentIngress {...{ appName, envName, components }} />
      </SimpleAsyncResource>
    ),
  };
}

export const EnvironmentCard: FunctionComponent<EnvironmentCardProps> = ({
  appName,
  env,
  repository,
}) => {
  const deployment = env.activeDeployment;
  const { header, body }: CardContent = !deployment?.name
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
    : CardContentBuilder(appName, env.name, deployment.name);

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
        <DeploymentDetails appName={appName} deployment={deployment} />

        <div className="grid">
          <Typography group="ui" variant="chip__badge">
            {env.branchMapping
              ? `Built from ${env.branchMapping} branch`
              : 'Not built automatically'}
          </Typography>
          {deployment?.gitTags && (
            <div className="env_card_tags grid grid--gap-x-small grid--auto-columns">
              <Icon data={github} size={18} />
              <GitTagLinks
                gitTags={deployment.gitTags}
                repository={repository}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

EnvironmentCard.propTypes = {
  appName: PropTypes.string.isRequired,
  env: PropTypes.shape(EnvironmentSummaryModelValidationMap)
    .isRequired as PropTypes.Validator<EnvironmentSummaryModel>,
  repository: PropTypes.string,
};
