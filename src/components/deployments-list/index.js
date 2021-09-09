import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { external_link, send } from '@equinor/eds-icons';
import PropTypes from 'prop-types';
import React from 'react';

import DeploymentSummary from './deployment-summary';
import deploymentSummaryModel from '../../models/deployment-summary';
import useGetApplication from '../page-application/use-get-application';

import './style.css';

export const DeploymentsList = ({
  appName,
  deployments,
  limit,
  inEnv = false,
}) => {
  const [getApplication] = useGetApplication(appName);
  const repo = getApplication.data
    ? getApplication.data.registration.repository
    : null;
  return (
    <div className="deployments-list grid grid--gap-medium">
      {deployments.length > 0 ? (
        <div className="grid--table-overflow">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>Date / Time</Table.Cell>
                {!inEnv && (
                  <>
                    <Table.Cell>Environment</Table.Cell>
                    <Table.Cell>Status</Table.Cell>
                  </>
                )}
                <Table.Cell>Type of job</Table.Cell>
                <Table.Cell>
                  Github commit <Icon data={external_link} />
                </Table.Cell>
                <Table.Cell>Promoted from</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {deployments
                .slice(0, limit || deployments.length)
                .map((deployment, i) => (
                  <Table.Row key={i}>
                    <DeploymentSummary
                      appName={appName}
                      deployment={deployment}
                      inEnv={inEnv}
                      repo={repo}
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
          <Typography>No deployments… yet</Typography>
        </div>
      )}
    </div>
  );
};

DeploymentsList.propTypes = {
  appName: PropTypes.string.isRequired,
  deployments: PropTypes.arrayOf(PropTypes.shape(deploymentSummaryModel))
    .isRequired,
  limit: PropTypes.number,
  inEnv: PropTypes.bool,
};

export default DeploymentsList;
