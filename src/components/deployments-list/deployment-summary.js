import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import RelativeToNow from '../time/relative-to-now';

import { routeWithParams, smallDeploymentName } from '../../utils/string';
import deploymentSummaryModel from '../../models/deployment-summary';
import routes from '../../routes';

import { Table } from '@equinor/eds-core-react';

const DeploymentSummary = ({ appName, deployment }) => {
  const deploymentLink = routeWithParams(routes.appDeployment, {
    appName,
    deploymentName: deployment.name,
  });

  return (
    <>
      <Table.Cell>
        <RelativeToNow time={deployment.activeFrom} titlePrefix="Start" />
      </Table.Cell>
      <Table.Cell>
        <Link className="deployment-summary__link" to={deploymentLink}>
          {smallDeploymentName(deployment.name)}
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link className="deployment" to={'#'}>
          TBA
        </Link>
      </Table.Cell>
    </>
  );
};

DeploymentSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.shape(deploymentSummaryModel).isRequired,
};

export default DeploymentSummary;
