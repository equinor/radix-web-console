import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { external_link, send } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import { DeploymentSummaryTableRow } from './deployment-summary-table-row';

import { useGetApplication } from '../page-application/use-get-application';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../models/deployment-summary';

import './style.css';

export interface DeploymentsListProps {
  appName: string;
  deployments: Array<DeploymentSummaryModel>;
  limit?: number;
  inEnv?: boolean;
}

export const DeploymentsList = (props: DeploymentsListProps): JSX.Element => {
  const [getApplication] = useGetApplication(props.appName);
  const repo = getApplication.data
    ? getApplication.data.registration.repository
    : null;
  return (
    <div className="deployments-list grid grid--gap-medium">
      {props.deployments.length > 0 ? (
        <div className="grid--table-overflow">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>Date / Time</Table.Cell>
                {!props.inEnv && (
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
              {props.deployments
                .slice(0, props.limit || props.deployments.length)
                .map((deployment, i) => (
                  <DeploymentSummaryTableRow
                    key={i}
                    appName={props.appName}
                    deployment={deployment}
                    inEnv={props.inEnv}
                    repo={repo}
                  />
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
  deployments: PropTypes.arrayOf(
    PropTypes.shape(DeploymentSummaryModelValidationMap)
  ).isRequired,
  limit: PropTypes.number,
  inEnv: PropTypes.bool,
};
