import {
  Chip,
  CircularProgress,
  Divider,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { github } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import { EnvironmentIngress } from './environment-ingress';

import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
import {
  type Component,
  type DeploymentSummary,
  type EnvironmentSummary,
  type ReplicaResourcesUtilizationResponse,
  useComponentsQuery,
  useGetApplicationResourcesUtilizationQuery,
} from '../../store/radix-api';
import {
  type EnvironmentVulnerabilities,
  useGetEnvironmentVulnerabilitySummaryQuery,
} from '../../store/scan-api';
import { routeWithParams } from '../../utils/string';
import { GitTagLinks } from '../git-tags/git-tag-links';

import './style.css';
import { UtilizationPopover } from '../utilization-popover/utilization-popover';
import { DeploymentDetails } from './deployment-details';
import { DeplopymentHeader, VulnerabilityHeader } from './environment-headers';

type EnvironmentCardProps = {
  appName: string;
  env: EnvironmentSummary;
  repository?: string;
};
export const EnvironmentCard = ({
  appName,
  env,
  repository,
}: EnvironmentCardProps) => {
  const deployment = env.activeDeployment;

  const { data: envScan, isLoading: isEnvScanLoading } =
    useGetEnvironmentVulnerabilitySummaryQuery(
      { appName, envName: env.name },
      { pollingInterval: 0 }
    );

  const { data: components, isLoading: isComponentsLoading } =
    useComponentsQuery(
      {
        appName,
        deploymentName: deployment?.name!,
      },
      { pollingInterval, skip: !deployment?.name }
    );

  const { data: utilization, isLoading: isUtilizationLoading } =
    useGetApplicationResourcesUtilizationQuery(
      { appName },
      { pollingInterval }
    );

  return (
    <EnvironmentCardLayout
      appName={appName}
      env={env}
      deployment={deployment}
      isLoading={
        isComponentsLoading || isUtilizationLoading || isEnvScanLoading
      }
      envScan={envScan}
      components={components}
      repository={repository}
      utilization={utilization}
    />
  );
};

export type EnvironmentCardLayoutProps = {
  appName: string;
  isLoading: boolean;
  components?: Component[];
  repository?: string;
  env: Pick<EnvironmentSummary, 'name' | 'status' | 'branchMapping'>;
  deployment?: Pick<DeploymentSummary, 'activeFrom' | 'name' | 'gitTags'>;
  envScan?: EnvironmentVulnerabilities;
  utilization?: ReplicaResourcesUtilizationResponse;
};

export const EnvironmentCardLayout = ({
  appName,
  env,
  deployment,
  isLoading,
  envScan,
  components,
  repository,
  utilization,
}: EnvironmentCardLayoutProps) => {
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

        <div className="env_card-header_badges grid grid--auto-columns grid--gap-x-small">
          {deployment?.name && (
            <>
              {isLoading && (
                <Chip>
                  <CircularProgress size={16} />
                </Chip>
              )}
              <UtilizationPopover
                utilization={utilization}
                path={`${env.name}.`}
              />
              <VulnerabilityHeader envScan={envScan} />
              <DeplopymentHeader components={components} />
            </>
          )}
        </div>
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

        <EnvironmentIngress components={components} />

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
