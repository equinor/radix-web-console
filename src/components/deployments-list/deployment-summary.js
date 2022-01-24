import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CommitHash } from '../commit-hash';
import { StatusBadge } from '../status-badge';
import { RelativeToNow } from '../time/relative-to-now';
import { DeploymentSummaryModelValidationMap } from '../../models/deployment-summary';
import { routes } from '../../routes';
import { routeWithParams, smallDeploymentName } from '../../utils/string';

const DeploymentSummary = ({ appName, deployment, inEnv, repo }) => {
  const deploymentLink = routeWithParams(routes.appDeployment, {
    appName,
    deploymentName: deployment.name,
  });
  const environmentLink = routeWithParams(routes.appEnvironment, {
    appName,
    envName: deployment.environment,
  });
  const promotedFromLink = routeWithParams(routes.appEnvironment, {
    appName,
    envName: deployment.promotedFromEnvironment,
  });

  return (
    <>
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
            href: `${repo}/commit/${deployment.commitID}`,
            rel: 'noopener noreferrer',
            target: '_blank',
          })}
        >
          <CommitHash commit={deployment.commitID} />
        </Typography>
      </Table.Cell>
      <Table.Cell>
        <Link to={promotedFromLink}>
          <Typography link as="span">
            {deployment.promotedFromEnvironment}
          </Typography>
        </Link>
      </Table.Cell>
    </>
  );
};

DeploymentSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.shape(DeploymentSummaryModelValidationMap).isRequired,
};

export default DeploymentSummary;
