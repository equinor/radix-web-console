import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CommitHash } from '../commit-hash';
import { StatusBadge } from '../status-badges';
import { RelativeToNow } from '../time/relative-to-now';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../models/deployment-summary';
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

export const DeploymentSummaryTableRow = (
  props: DeploymentSummaryTableRowProps
): JSX.Element => {
  const deploymentLink: string = routeWithParams(routes.appDeployment, {
    appName: props.appName,
    deploymentName: props.deployment.name,
  });
  const environmentLink: string = routeWithParams(routes.appEnvironment, {
    appName: props.appName,
    envName: props.deployment.environment,
  });
  const promotedFromLink: string = routeWithParams(routes.appEnvironment, {
    appName: props.appName,
    envName: props.deployment.promotedFromEnvironment,
  });

  const commitHash =
    props.deployment.gitCommitHash || props.deployment.commitID;
  return (
    <Table.Row>
      <Table.Cell>
        <Link className="deployment-summary__link" to={deploymentLink}>
          <Typography link as="span">
            {smallDeploymentName(props.deployment.name)}
          </Typography>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <RelativeToNow
          time={props.deployment.activeFrom}
          titlePrefix="Start"
          capitalize
        />
      </Table.Cell>
      {!props.inEnv && (
        <>
          <Table.Cell>
            <Link to={environmentLink}>
              <Typography link as="span">
                {props.deployment.environment}
              </Typography>
            </Link>
          </Table.Cell>
          <Table.Cell>
            {props.deployment.activeTo ? (
              <StatusBadge variant="default">Inactive</StatusBadge>
            ) : (
              <StatusBadge variant="active">Active</StatusBadge>
            )}
          </Table.Cell>
        </>
      )}
      <Table.Cell>{props.deployment.pipelineJobType}</Table.Cell>
      <Table.Cell>
        <Typography
          {...(props.repo && {
            link: true,
            href: `${linkToGitHubCommit(props.repo, commitHash)}`,
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
            {props.deployment.promotedFromEnvironment}
          </Typography>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

DeploymentSummaryTableRow.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.shape(DeploymentSummaryModelValidationMap).isRequired,
  repo: PropTypes.string,
  inEnv: PropTypes.bool,
} as PropTypes.ValidationMap<DeploymentSummaryTableRowProps>;
