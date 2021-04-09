import PropTypes from 'prop-types';
import ReplicaSummaryModel from '../../models/replica-summary';
import { Link } from 'react-router-dom';
import * as routing from '../../utils/routing';
import { smallReplicaName } from '../../utils/string';
import ReplicaStatus from '../replica-status';
import RelativeToNow from '../time/relative-to-now';
import Duration from '../time/duration';
import React, { useEffect, useState } from 'react';

const ReplicaList = ({ appName, envName, componentName, replicaList }) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    setNow(new Date());
  }, [replicaList]);
  return (
    <span>
      <h2 className="o-heading-section">Replicas</h2>
      {replicaList &&
        replicaList.map((replica) => (
          <p key={replica.name}>
            <Link
              to={routing.getReplicaUrl(
                appName,
                envName,
                componentName,
                replica.name
              )}
            >
              {smallReplicaName(replica.name)}{' '}
            </Link>
            <ReplicaStatus replica={replica} />
            &nbsp;&nbsp;&nbsp;Created{' '}
            <strong>
              <RelativeToNow time={replica.created}></RelativeToNow>
            </strong>
            &nbsp;&nbsp;&nbsp; Duration{' '}
            <strong>
              <Duration start={replica.created} end={now} />
            </strong>
          </p>
        ))}
    </span>
  );
};

ReplicaList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaSummaryModel)),
};

export default ReplicaList;
