import { Icon, Table, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
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
} from '../../models/replica-summary';
import { smallReplicaName } from '../../utils/string';

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

  const [expandRows, setExpandRows] = useState<{ [key: string]: boolean }>({});
  const toggleExpandRow = (name: string) =>
    setExpandRows({ ...expandRows, [name]: !expandRows[name] });

  return (
    <Table>
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
        {replicaList
          .map((x) => ({ replica: x, isExpanded: !!expandRows[x.name] }))
          .map(({ replica, isExpanded }, i) => (
            <Fragment key={i}>
              <Table.Row
                {...(isExpanded && { className: 'replica-list-row__expanded' })}
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
                      data={isExpanded ? chevron_up : chevron_down}
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
              {isExpanded && (
                <Table.Row>
                  <Table.Cell />
                  <Table.Cell colSpan={4}>
                    <div className="grid grid--gap-medium">
                      <span />
                      <ReplicaImage replica={replica} />
                      <span />
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
