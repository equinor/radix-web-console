import { Divider, Icon, Typography } from '@equinor/eds-core-react';
import { github, link, send } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import type React from 'react';
import { type FunctionComponent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  EnvironmentCardStatus,
  type EnvironmentCardStatusMap,
  EnvironmentVulnerabilityIndicator,
} from './environment-card-status';
import { EnvironmentIngress } from './environment-ingress';
import {
  aggregateComponentEnvironmentStatus,
  aggregateComponentReplicaEnvironmentStatus,
  environmentVulnerabilitySummarizer,
} from './environment-status-utils';

import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
import {
  type DeploymentSummary,
  type EnvironmentSummary,
  type ReplicaSummary,
  useComponentsQuery,
} from '../../store/radix-api';
import { type Vulnerability, scanApi } from '../../store/scan-api';
import { filterFields } from '../../utils/filter-fields';
import { routeWithParams } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { GitTagLinks } from '../git-tags/git-tag-links';
import { RelativeToNow } from '../time/relative-to-now';

import './style.css';
import { getAppDeploymentUrl } from '../../utils/routing';

type CardContent = { header: React.JSX.Element; body: React.JSX.Element };

export interface EnvironmentCardProps {
  appName: string;
  env: Readonly<EnvironmentSummary>;
  repository?: string;
}

const visibleKeys: Array<Lowercase<Vulnerability['severity']>> = [
  'critical',
  'high',
];

const DeploymentDetails: FunctionComponent<{
  appName: string;
  deployment: Readonly<DeploymentSummary>;
}> = ({ appName, deployment }) =>
  !deployment ? (
    <Typography color="disabled">
      <Icon data={link} style={{ marginRight: 'var(--eds_spacing_small)' }} />
      No active deployment
    </Typography>
  ) : (
    <Typography
      as={Link}
      to={getAppDeploymentUrl(appName, deployment.name)}
      link
      token={{ textDecoration: 'none' }}
    >
      <Icon data={send} style={{ marginRight: 'var(--eds_spacing_small)' }} />
      <Typography as="span" color="primary">
        deployment{' '}
        <Typography as="span" color="gray">
          (<RelativeToNow time={new Date(deployment.activeFrom)} />)
        </Typography>
      </Typography>
    </Typography>
  );

function CardContentBuilder(
  appName: string,
  envName: string,
  deploymentName: string
): CardContent {
  const { data: components, ...componentsState } = useComponentsQuery(
    {
      appName,
      deploymentName,
    },
    { pollingInterval }
  );
  const [envScanTrigger, { data: envScan, ...envScanState }] =
    scanApi.endpoints.getEnvironmentVulnerabilitySummary.useLazyQuery();

  useEffect(() => {
    const request = envScanTrigger({ appName, envName });
    return () => request?.abort();
  }, [appName, envScanTrigger, envName]);

  const vulnerabilities = environmentVulnerabilitySummarizer(envScan);
  const replicas = (components ?? []).reduce<Array<ReplicaSummary>>(
    (obj, { replicaList }) => (!replicaList ? obj : [...obj, ...replicaList]),
    []
  );

  const elements: EnvironmentCardStatusMap = {
    Components: aggregateComponentEnvironmentStatus(components),
    ...(replicas.length > 0 && {
      Replicas: aggregateComponentReplicaEnvironmentStatus(components),
    }),
  };

  const statusElement = (
    <AsyncResource asyncState={componentsState} errorContent={false}>
      {components?.length > 0 && (
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
    </AsyncResource>
  );

  return {
    header: (
      <div className="env_card-header_badges grid grid--auto-columns grid--gap-x-small">
        <AsyncResource asyncState={envScanState} errorContent={statusElement}>
          {statusElement}
        </AsyncResource>
      </div>
    ),
    body: (
      <AsyncResource asyncState={componentsState} errorContent={false}>
        {components?.length > 0 && (
          <EnvironmentIngress {...{ appName, envName, components }} />
        )}
      </AsyncResource>
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
          <Typography color="disabled">
            <Icon
              data={link}
              style={{ marginRight: 'var(--eds_spacing_small)' }}
            />
            No link available
          </Typography>
        ),
      }
    : CardContentBuilder(appName, env.name, deployment.name);

  return (
    <div className="env_card">
      <div className="env_card-header">
        <div>
          <Typography
            as={Link}
            group="ui"
            variant="accordion_header"
            color="primary"
            to={routeWithParams(routes.appEnvironment, {
              appName: appName,
              envName: env.name,
            })}
          >
            {env.name}
          </Typography>
        </div>

        {header}
      </div>

      <Divider variant="small" />

      <div className="env_card_content grid grid--gap-medium">
        {env.status === 'Orphan' && (
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
  env: PropTypes.object.isRequired as PropTypes.Validator<EnvironmentSummary>,
  repository: PropTypes.string,
};
