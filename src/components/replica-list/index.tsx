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
  replicaUrlFunc: (name: string) => string;
  replicaList?: Array<ReplicaSummaryNormalizedModel>;
}

export const ReplicaList = ({
  replicaUrlFunc,
  replicaList,
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
    <>
      {replicaList && (
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
      )}
    </>
  );
};

ReplicaList.propTypes = {
  replicaUrlFunc: PropTypes.func.isRequired,
  replicaList: PropTypes.arrayOf(
    PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap)
  ),
} as PropTypes.ValidationMap<ReplicaListProps>;
