import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { external_link, send } from '@equinor/eds-icons';
import PropTypes from 'prop-types';
import React from 'react';

import DeploymentSummary from './deployment-summary';
import deploymentSummaryModel from '../../models/deployment-summary';

import './style.css';

export const DeploymentsList = ({
  appName,
  deployments,
  limit,
  inEnv = false,
}) => (
  <div className="deployments-list">
    <Typography variant="h4">Previous deployments</Typography>
    {deployments.length > 0 ? (
      <div className="grid grid--table-overflow">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Cell>Date / Time</Table.Cell>
              <Table.Cell>ID</Table.Cell>
              <Table.Cell>
                Github commit <Icon data={external_link} />
              </Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {deployments
              .slice(0, limit || deployments.length)
              .map((deployment) => (
                <Table.Row key={deployment.name}>
                  <DeploymentSummary
                    appName={appName}
                    deployment={deployment}
                    inEnv={inEnv}
                  />
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    ) : (
      <div className="stat_empty">
        <span>
          <Icon data={send} />
        </span>
        <Typography variant="body_short">No deployments… yet</Typography>
      </div>
    )}
  </div>
);

DeploymentsList.propTypes = {
  appName: PropTypes.string.isRequired,
  deployments: PropTypes.arrayOf(PropTypes.shape(deploymentSummaryModel))
    .isRequired,
  limit: PropTypes.number,
  inEnv: PropTypes.bool,
};

export default DeploymentsList;
