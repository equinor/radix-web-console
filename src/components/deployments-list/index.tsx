import { Icon, Table, Typography } from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_up,
  external_link,
  IconData,
  send,
  unfold_more,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { DeploymentSummaryTableRow } from './deployment-summary-table-row';

import { useGetApplication } from '../page-application/use-get-application';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../models/deployment-summary';
import {
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../utils/sort-utils';

import './style.css';

export interface DeploymentsListProps {
  appName: string;
  deployments: Array<DeploymentSummaryModel>;
  limit?: number;
  inEnv?: boolean;
}

function getNewSortDir(
  direction: sortDirection,
  nullable?: boolean
): sortDirection | null {
  if (!direction) {
    return 'ascending';
  }

  if (direction === 'ascending') {
    return 'descending';
  }

  return nullable ? null : 'ascending';
}

function getSortIcon(dir: sortDirection): IconData {
  switch (dir) {
    case 'ascending':
      return chevron_down;
    case 'descending':
      return chevron_up;
    default:
      return unfold_more;
  }
}

export const DeploymentsList = (props: DeploymentsListProps): JSX.Element => {
  const [getApplication] = useGetApplication(props.appName);
  const repo = getApplication.data?.registration.repository;

  const [deploymentsTableRows, setDeploymentTableRows] = useState<
    JSX.Element[]
  >([]);

  const [dateSortDir, setDateSortDir] = useState<sortDirection>('descending');
  const [envSortDir, setEnvSortDir] = useState<sortDirection>();
  const [pipelineSortDir, setPipelineSortDir] = useState<sortDirection>();

  useEffect(() => {
    const sortedDeployments =
      props?.deployments?.slice(
        0,
        props.limit ? props.limit : props.deployments.length
      ) || [];
    sortedDeployments
      .sort((x, y) => sortCompareDate(x.activeFrom, y.activeFrom, dateSortDir))
      .sort((x, y) =>
        sortCompareString(
          x.pipelineJobType,
          y.pipelineJobType,
          pipelineSortDir,
          false,
          () => !!pipelineSortDir
        )
      )
      .sort((x, y) =>
        sortCompareString(
          x.environment,
          y.environment,
          envSortDir,
          false,
          () => !!envSortDir
        )
      );

    const tableRows = sortedDeployments.map((deployment, i) => (
      <DeploymentSummaryTableRow
        key={i}
        appName={props.appName}
        deployment={deployment}
        inEnv={props.inEnv}
        repo={repo}
      />
    ));
    setDeploymentTableRows(tableRows);
  }, [dateSortDir, envSortDir, pipelineSortDir, props, repo]);

  return (
    <div className="deployments-list grid grid--gap-medium">
      {props.deployments.length > 0 ? (
        <div className="grid--table-overflow">
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell
                  sort="none"
                  onClick={() => setDateSortDir(getNewSortDir(dateSortDir))}
                >
                  Date / Time
                  <Icon
                    className="deployments-list-sort-icon"
                    data={getSortIcon(dateSortDir)}
                    size={16}
                  />
                </Table.Cell>
                {!props.inEnv && (
                  <>
                    <Table.Cell
                      sort="none"
                      onClick={() =>
                        setEnvSortDir(getNewSortDir(envSortDir, true))
                      }
                    >
                      Environment
                      <Icon
                        className="deployments-list-sort-icon"
                        data={getSortIcon(envSortDir)}
                        size={16}
                      />
                    </Table.Cell>
                    <Table.Cell>Status</Table.Cell>
                  </>
                )}
                <Table.Cell
                  sort="none"
                  onClick={() =>
                    setPipelineSortDir(getNewSortDir(pipelineSortDir, true))
                  }
                >
                  Type of job
                  <Icon
                    className="deployments-list-sort-icon"
                    data={getSortIcon(pipelineSortDir)}
                    size={16}
                  />
                </Table.Cell>
                <Table.Cell>
                  Github commit <Icon data={external_link} />
                </Table.Cell>
                <Table.Cell>Promoted from</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>{deploymentsTableRows}</Table.Body>
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
} as PropTypes.ValidationMap<DeploymentsListProps>;
