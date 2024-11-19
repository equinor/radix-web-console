import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { routes } from '../../routes';
import type { DeploymentSummary } from '../../store/radix-api';
import { routeWithParams, smallDeploymentName } from '../../utils/string';
import { CommitHash } from '../commit-hash';
import { StatusBadge } from '../status-badges';
import { RelativeToNow } from '../time/relative-to-now';

export interface DeploymentSummaryTableRowProps {
  appName: string;
  deployment: Readonly<DeploymentSummary>;
  repo?: string;
  inEnv?: boolean;
}

export const DeploymentSummaryTableRow: FunctionComponent<
  DeploymentSummaryTableRowProps
> = ({ appName, deployment, repo, inEnv }) => {
  const deploymentLink = routeWithParams(routes.appDeployment, {
    appName: appName,
    deploymentName: deployment.name,
  });
  const environmentLink = routeWithParams(routes.appEnvironment, {
    appName: appName,
    envName: deployment.environment,
  });
  const promotedFromLink = routeWithParams(routes.appEnvironment, {
    appName: appName,
    envName: deployment.promotedFromEnvironment,
  });
  const commitHash = deployment.gitCommitHash || deployment.commitID;
  return (
    <Table.Row>
      <Table.Cell>
        <Typography
          className="deployment-summary__link"
          as={Link}
          to={deploymentLink}
          link
          token={{ textDecoration: 'none' }}
        >
          {smallDeploymentName(deployment.name)}
        </Typography>
      </Table.Cell>
      <Table.Cell>
        <RelativeToNow
          time={new Date(deployment.activeFrom)}
          titlePrefix="Start"
          capitalize
        />
      </Table.Cell>
      {!inEnv && (
        <>
          <Table.Cell>
            <Typography as={Link} to={environmentLink} link>
              {deployment.environment}
            </Typography>
          </Table.Cell>
          <Table.Cell>
            {deployment.activeTo ? (
              <StatusBadge variant="default">Inactive</StatusBadge>
            ) : (
              <StatusBadge variant="active">Active</StatusBadge>
            )}
          </Table.Cell>
        </>
      )}
      <Table.Cell>{deployment.pipelineJobType}</Table.Cell>
      <Table.Cell>
        <CommitHash commit={commitHash} repo={repo} />
      </Table.Cell>
      <Table.Cell>
        <Typography as={Link} to={promotedFromLink} link>
          {deployment.promotedFromEnvironment}
        </Typography>
      </Table.Cell>
    </Table.Row>
  );
};

DeploymentSummaryTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.object
    .isRequired as PropTypes.Validator<DeploymentSummary>,
  repo: PropTypes.string,
  inEnv: PropTypes.bool,
};
