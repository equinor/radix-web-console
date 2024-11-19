import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { external_link, send } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { type FunctionComponent, useEffect, useState } from 'react';

import { DeploymentSummaryTableRow } from './deployment-summary-table-row';

import { pollingInterval } from '../../store/defaults';
import {
  type DeploymentSummary,
  useGetApplicationQuery,
} from '../../store/radix-api';
import {
  type SortDirection,
  dataSorter,
  sortCompareDate,
  sortCompareString,
} from '../../utils/sort-utils';
import { TableSortIcon, getNewSortDir } from '../../utils/table-sort-utils';

import './style.css';

export interface DeploymentsListProps {
  appName: string;
  deployments?: Readonly<Array<DeploymentSummary>>;
  limit?: number;
  inEnv?: boolean;
}

export const DeploymentsList: FunctionComponent<DeploymentsListProps> = ({
  appName,
  deployments,
  limit,
  inEnv,
}) => {
  const { data } = useGetApplicationQuery({ appName }, { pollingInterval });
  const repo = data?.registration.repository;

  const [sortedData, setSortedData] = useState(deployments || []);
  const [dateSort, setDateSort] = useState<SortDirection>('descending');
  const [envSort, setEnvSort] = useState<SortDirection>();
  const [pipelineSort, setPipelineSort] = useState<SortDirection>();

  useEffect(() => {
    setSortedData(
      dataSorter(deployments?.slice(0, limit || deployments.length), [
        (x, y) => sortCompareDate(x.activeFrom, y.activeFrom, dateSort),
        (x, y) =>
          sortCompareString(
            x.pipelineJobType,
            y.pipelineJobType,
            pipelineSort,
            false,
            () => !!pipelineSort
          ),
        (x, y) =>
          sortCompareString(
            x.environment,
            y.environment,
            envSort,
            false,
            () => !!envSort
          ),
      ])
    );
  }, [dateSort, deployments, envSort, limit, pipelineSort]);

  return (
    <div className="deployments-list grid grid--gap-medium">
      {sortedData.length > 0 ? (
        <div className="grid--table-overflow">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell
                  sort="none"
                  onClick={() => setDateSort(getNewSortDir(dateSort))}
                >
                  Date / Time
                  <TableSortIcon direction={dateSort} />
                </Table.Cell>
                {!inEnv && (
                  <>
                    <Table.Cell
                      sort="none"
                      onClick={() => setEnvSort(getNewSortDir(envSort, true))}
                    >
                      Environment
                      <TableSortIcon direction={envSort} />
                    </Table.Cell>
                    <Table.Cell>Status</Table.Cell>
                  </>
                )}
                <Table.Cell
                  sort="none"
                  onClick={() =>
                    setPipelineSort(getNewSortDir(pipelineSort, true))
                  }
                >
                  Type of job
                  <TableSortIcon direction={pipelineSort} />
                </Table.Cell>
                <Table.Cell>
                  Github commit <Icon data={external_link} />
                </Table.Cell>
                <Table.Cell>Promoted from</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {sortedData.map((x, i) => (
                <DeploymentSummaryTableRow
                  key={i}
                  appName={appName}
                  deployment={x}
                  inEnv={inEnv}
                  repo={repo}
                />
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="deployments-list--empty">
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
    PropTypes.object as PropTypes.Validator<DeploymentSummary>
  ),
  limit: PropTypes.number,
  inEnv: PropTypes.bool,
};
