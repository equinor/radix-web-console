import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FunctionComponent } from 'react';

import { CommitHash } from '../commit-hash';
import { StatusBadge } from '../status-badges';
import { RelativeToNow } from '../time/relative-to-now';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../models/radix-api/deployments/deployment-summary';
import { routes } from '../../routes';
import {
  linkToGitHubCommit,
  routeWithParams,
  smallDeploymentName,
} from '../../utils/string';

export interface DeploymentSummaryTableRowProps {
  appName: string;
  deployment: DeploymentSummaryModel;
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
        <Link className="deployment-summary__link" to={deploymentLink}>
          <Typography link as="span">
            {smallDeploymentName(deployment.name)}
          </Typography>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <RelativeToNow
          time={deployment.activeFrom}
          titlePrefix="Start"
          capitalize
        />
      </Table.Cell>
      {!inEnv && (
        <>
          <Table.Cell>
            <Link to={environmentLink}>
              <Typography link as="span">
                {deployment.environment}
              </Typography>
            </Link>
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
        <Typography
          {...(repo && {
            link: true,
            href: `${linkToGitHubCommit(repo, commitHash)}`,
            rel: 'noopener noreferrer',
            target: '_blank',
          })}
        >
          <CommitHash commit={commitHash} />
        </Typography>
      </Table.Cell>
      <Table.Cell>
        <Link to={promotedFromLink}>
          <Typography link as="span">
            {deployment.promotedFromEnvironment}
          </Typography>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

DeploymentSummaryTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.shape(DeploymentSummaryModelValidationMap)
    .isRequired as PropTypes.Validator<DeploymentSummaryModel>,
  repo: PropTypes.string,
  inEnv: PropTypes.bool,
};
