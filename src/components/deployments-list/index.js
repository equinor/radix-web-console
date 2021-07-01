import PropTypes from 'prop-types';
import React from 'react';

import DeploymentSummary from './deployment-summary';

import deploymentSummaryModel from '../../models/deployment-summary';

import './style.css';

import { Icon, Table } from '@equinor/eds-core-react';
import { send, external_link } from '@equinor/eds-icons';

export const DeploymentsList = ({
  appName,
  deployments,
  limit,
  inEnv = false,
}) => (
  <div className="deployments-list">
    <h4>Previous deployments</h4>
    {deployments.length === 0 && (
      <div className="stat_empty">
        <span>
          <Icon data={send} />
        </span>
        <p className="body_short">No deployments… yet</p>
      </div>
    )}
    {deployments.length > 0 && (
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
