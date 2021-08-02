import PropTypes from 'prop-types';
import ReplicaSummaryModel from '../../models/replica-summary';
import { Link } from 'react-router-dom';
import * as routing from '../../utils/routing';
import { smallReplicaName } from '../../utils/string';
import ReplicaStatus from '../replica-status';
import RelativeToNow from '../time/relative-to-now';
import Duration from '../time/duration';
import React, { useEffect, useState } from 'react';
import { Table, Typography } from '@equinor/eds-core-react';

const ReplicaList = ({ appName, envName, componentName, replicaList }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    setNow(new Date());
  }, [replicaList]);
  return (
    <React.Fragment>
      <h4>Replicas</h4>
      {replicaList ? (
        <Table className="replicas_table">
          <Table.Head>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>Created</Table.Cell>
              <Table.Cell>Duration</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {replicaList.map((replica) => (
              <Table.Row key={replica.name}>
                <Table.Cell>
                  <Link
                    to={routing.getReplicaUrl(
                      appName,
                      envName,
                      componentName,
                      replica.name
                    )}
                  >
                    <Typography link as="span">
                      {smallReplicaName(replica.name)}{' '}
                    </Typography>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <ReplicaStatus replica={replica} />
                </Table.Cell>
                <Table.Cell>
                  <RelativeToNow time={replica.created}></RelativeToNow>
                </Table.Cell>
                <Table.Cell>
                  <Duration start={replica.created} end={now} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Typography variant="body_short">
          This component has no replicas
        </Typography>
      )}
    </React.Fragment>
  );
};

ReplicaList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaSummaryModel)),
};

export default ReplicaList;
