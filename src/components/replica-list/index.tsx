import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up, IconData } from '@equinor/eds-icons';
import { clsx } from 'clsx';
import * as PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ReplicaImage } from '../replica-image';
import { ReplicaStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../../models/radix-api/deployments/replica-summary';
import {
  sortCompareDate,
  sortCompareString,
  sortDirection,
} from '../../utils/sort-utils';
import { smallReplicaName } from '../../utils/string';
import {
  getNewSortDir,
  tableDataSorter,
  TableSortIcon,
} from '../../utils/table-sort-utils';

import './style.css';

export interface ReplicaListProps {
  replicaList: Array<ReplicaSummaryNormalizedModel>;
  replicaUrlFunc: (name: string) => string;
}

const chevronIcons: Array<IconData> = [chevron_down, chevron_up];

export const ReplicaList = ({
  replicaList,
  replicaUrlFunc,
}: ReplicaListProps): React.JSX.Element => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  useEffect(() => {
    setLastUpdate(new Date());
  }, [replicaList]);

  const [sortedData, setSortedData] = useState(replicaList || []);

  const [dateSort, setDateSort] = useState<sortDirection>();
  const [statusSort, setStatusSort] = useState<sortDirection>();
  useEffect(() => {
    setSortedData(
      tableDataSorter(replicaList, [
        (x, y) =>
          sortCompareDate(x.created, y.created, dateSort, () => !!dateSort),
        (x, y) =>
          sortCompareString(
            x.status,
            y.status,
            statusSort,
            false,
            () => !!statusSort
          ),
      ])
    );
  }, [dateSort, replicaList, statusSort]);

  const [expandRows, setExpandRows] = useState<Record<string, boolean>>({});
  function toggleExpandRow(name: string) {
    setExpandRows({ ...expandRows, [name]: !expandRows[name] });
  }

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell />
          <Table.Cell>Name</Table.Cell>
          <Table.Cell
            sort="none"
            onClick={() => setStatusSort(getNewSortDir(statusSort, true))}
          >
            Status
            <TableSortIcon direction={statusSort} />
          </Table.Cell>
          <Table.Cell
            sort="none"
            onClick={() => setDateSort(getNewSortDir(dateSort, true))}
          >
            Created
            <TableSortIcon direction={dateSort} />
          </Table.Cell>
          <Table.Cell>Duration</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sortedData
          .map((x) => ({ replica: x, expanded: !!expandRows[x.name] }))
          .map(({ replica, expanded }, i) => (
            <Fragment key={i}>
              <Table.Row
                className={clsx({ 'border-bottom-transparent': expanded })}
              >
                <Table.Cell
                  className={`fitwidth padding-right-0`}
                  variant="icon"
                >
                  <Typography
                    link
                    as="span"
                    onClick={() => toggleExpandRow(replica.name)}
                  >
                    <Icon
                      size={24}
                      data={chevronIcons[+!!expanded]}
                      role="button"
                      title="Toggle more information"
                    />
                  </Typography>
                </Table.Cell>
                <Table.Cell>
                  <Link to={replicaUrlFunc(replica.name)}>
                    <Typography link as="span">
                      {smallReplicaName(replica.name)}{' '}
                    </Typography>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <ReplicaStatusBadge status={replica.status} />
                </Table.Cell>
                <Table.Cell>
                  <RelativeToNow time={replica.created} />
                </Table.Cell>
                <Table.Cell>
                  <Duration start={replica.created} end={lastUpdate} />
                </Table.Cell>
              </Table.Row>
              {expanded && (
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell colSpan={4}>
                    <div className="grid grid--gap-medium">
                      <ReplicaImage replica={replica} />
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Fragment>
          ))}
      </Table.Body>
    </Table>
  );
};

ReplicaList.propTypes = {
  replicaList: PropTypes.arrayOf(
    PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap)
  ).isRequired,
  replicaUrlFunc: PropTypes.func.isRequired,
} as PropTypes.ValidationMap<ReplicaListProps>;
