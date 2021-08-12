import { Table, Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import RelativeToNow from '../time/relative-to-now';
import deploymentSummaryModel from '../../models/deployment-summary';
import routes from '../../routes';
import { routeWithParams, smallDeploymentName } from '../../utils/string';

const DeploymentSummary = ({ appName, deployment }) => {
  const deploymentLink = routeWithParams(routes.appDeployment, {
    appName,
    deploymentName: deployment.name,
  });

  return (
    <>
      <Table.Cell>
        <RelativeToNow
          time={deployment.activeFrom}
          titlePrefix="Start"
          capitalize
        />
      </Table.Cell>
      <Table.Cell>
        <Link className="deployment-summary__link" to={deploymentLink}>
          <Typography>{smallDeploymentName(deployment.name)}</Typography>
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Typography link to={'#'}>
          TBA
        </Typography>
      </Table.Cell>
    </>
  );
};

DeploymentSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.shape(deploymentSummaryModel).isRequired,
};

export default DeploymentSummary;
