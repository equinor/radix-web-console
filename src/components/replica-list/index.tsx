import { Table } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { ReplicaListRow } from './replica-list-row';

import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../../models/replica-summary';

import './style.css';

export interface ReplicaListProps {
  replicaList: Array<ReplicaSummaryNormalizedModel>;
  replicaUrlFunc: (name: string) => string;
}

export const ReplicaList = ({
  replicaList,
  replicaUrlFunc,
}: ReplicaListProps): JSX.Element => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  useEffect(() => {
    setLastUpdate(new Date());
  }, [replicaList]);

  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  const toggleExpandRow = (replicaName: string) =>
    setExpandedRows({
      ...expandedRows,
      [replicaName]: !expandedRows[replicaName],
    });

  return (
    <div className="grid grid--table-overflow">
      <Table className="replica-list-table">
        <Table.Head>
          <Table.Row>
            <Table.Cell />
            <Table.Cell>Name</Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>Created</Table.Cell>
            <Table.Cell>Duration</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {replicaList.map((x) => (
            <ReplicaListRow
              key={x.name}
              replica={x}
              replicaLink={replicaUrlFunc(x.name)}
              lastUpdate={lastUpdate}
              toggleExpand={() => toggleExpandRow(x.name)}
              isExpanded={!!expandedRows[x.name]}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

ReplicaList.propTypes = {
  replicaList: PropTypes.arrayOf(
    PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap)
  ).isRequired,
  replicaUrlFunc: PropTypes.func.isRequired,
} as PropTypes.ValidationMap<ReplicaListProps>;
