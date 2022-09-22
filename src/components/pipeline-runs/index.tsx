import { Icon, Table, Typography } from '@equinor/eds-core-react';
import {
  chevron_down,
  chevron_up,
  IconData,
  unfold_more,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { PipelineRunTableRow } from './pipeline-run-table-row';

import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/pipeline-run';
import {
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../utils/sort-utils';

import './style.css';

export interface PipelineRunListProps {
  appName: string;
  jobName: string;
  pipelineRuns: Array<PipelineRunModel>;
  limit?: number;
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

export const PipelineRuns = (props: PipelineRunListProps): JSX.Element => {
  const [rows, setRows] = useState<Array<JSX.Element>>([]);
  const [dateSortDir, setDateSortDir] = useState<sortDirection>('descending');
  const [envSortDir, setEnvSortDir] = useState<sortDirection>();

  useEffect(() => {
    const sortedPipelineRuns =
      props.pipelineRuns?.slice(0, props.limit ?? props.pipelineRuns.length) ||
      [];
    sortedPipelineRuns
      .sort((x, y) => sortCompareDate(x.started, y.started, dateSortDir))
      .sort((x, y) =>
        sortCompareString(x.env, y.env, envSortDir, false, () => !!envSortDir)
      );

    const tableRows = sortedPipelineRuns.map((pipelineRun) => (
      <PipelineRunTableRow
        key={pipelineRun.name}
        appName={props.appName}
        jobName={props.jobName}
        pipelineRun={pipelineRun}
      />
    ));
    setRows(tableRows);
  }, [dateSortDir, envSortDir, props]);

  return rows?.length > 0 ? (
    <div className="pipeline-runs-list grid grid--table-overflow">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() => setEnvSortDir(getNewSortDir(envSortDir, true))}
            >
              Environment
              <Icon
                className="pipeline-run-list-sort-icon"
                data={getSortIcon(envSortDir)}
                size={16}
              />
            </Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() => setDateSortDir(getNewSortDir(dateSortDir))}
            >
              Date/Time
              <Icon
                className="pipeline-run-list-sort-icon"
                data={getSortIcon(dateSortDir)}
                size={16}
              />
            </Table.Cell>
            <Table.Cell>Status</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{rows.map((tableRow) => tableRow)}</Table.Body>
      </Table>
    </div>
  ) : (
    <Typography variant="h4">No pipeline runs yet</Typography>
  );
};

PipelineRuns.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRuns: PropTypes.arrayOf(
    PropTypes.shape(PipelineRunModelValidationMap)
  ).isRequired,
  limit: PropTypes.number,
} as PropTypes.ValidationMap<PipelineRunListProps>;
