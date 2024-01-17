import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import { PipelineRunTableRow } from './pipeline-run-table-row';

import { PipelineRun as PipelineRunModel } from '../../store/radix-api';
import {
  dataSorter,
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../utils/sort-utils';
import { TableSortIcon, getNewSortDir } from '../../utils/table-sort-utils';

import './style.css';

interface Props {
  appName: string;
  jobName: string;
  pipelineRuns: Array<PipelineRunModel>;
  limit?: number;
}

export function PipelineRuns({ appName, jobName, pipelineRuns, limit }: Props) {
  const [dateSort, setDateSort] = useState<sortDirection>('descending');
  const [envSort, setEnvSort] = useState<sortDirection>();

  const sortedData = useMemo(() => {
    return dataSorter(pipelineRuns?.slice(0, limit || pipelineRuns.length), [
      (x, y) => sortCompareDate(x.started, y.started, dateSort),
      (x, y) =>
        sortCompareString(x.env, y.env, envSort, false, () => !!envSort),
    ]);
  }, [dateSort, envSort, limit, pipelineRuns]);

  return sortedData.length > 0 ? (
    <div className="pipeline-runs__list grid grid--table-overflow">
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Name</Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() => setEnvSort(getNewSortDir(envSort, true))}
            >
              Environment
              <TableSortIcon direction={envSort} />
            </Table.Cell>
            <Table.Cell
              sort="none"
              onClick={() => setDateSort(getNewSortDir(dateSort))}
            >
              Date/Time
              <TableSortIcon direction={dateSort} />
            </Table.Cell>
            <Table.Cell>Status</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {sortedData.map((x, i) => (
            <PipelineRunTableRow
              key={i}
              appName={appName}
              jobName={jobName}
              pipelineRun={x}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  ) : (
    <Typography variant="h4">No pipeline runs yet</Typography>
  );
}

PipelineRuns.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  pipelineRuns: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<PipelineRunModel>
  ).isRequired,
  limit: PropTypes.number,
};
