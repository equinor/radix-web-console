import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AsyncResource from '../async-resource/simple-async-resource';
import { Code } from '../code';
import { ReplicaStatus } from '../replica-status';
import ReplicaSummaryModel from '../../models/replica-summary';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { smallReplicaName } from '../../utils/string';
import { ReplicaImage } from '../replica-image';
import { useInterval } from '../../effects/use-interval';

const STATUS_OK = 'Running';

const ReplicaDuration = ({ replica }) => {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 1000);

  return (
    <>
      {replica && (
        <>
          <Typography>
            Created{' '}
            <strong>
              <RelativeToNow time={replica.created} />
            </strong>
          </Typography>
          <Typography>
            Duration{' '}
            <strong>
              <Duration start={replica.created} end={now} />
            </strong>
          </Typography>
        </>
      )}
    </>
  );
};

const ReplicaState = ({ replica }) => (
  <>
    {replica && (
      <>
        {replica.status !== STATUS_OK && replica.statusMessage && (
          <>
            <Typography>Status message is:</Typography>
            <Code>{replica.statusMessage}</Code>
          </>
        )}
        {!Number.isNaN(replica.restartCount) && replica.restartCount > 0 && (
          <div>
            <Typography>Restarted {replica.restartCount} times</Typography>
          </div>
        )}
      </>
    )}
  </>
);

export const Replica = (props) => {
  const { logState, replica, title, duration, status, state } = props;
  const replicaLog = logState?.data;

  const [replicaName, setReplicaName] = useState('');
  useEffect(() => setReplicaName(replica?.name ?? ''), [replica]);

  return (
    <>
      <section className="grid grid--gap-medium overview">
        <Typography variant="h4">Overview</Typography>
        <div className="grid grid--gap-medium grid--overview-columns">
          <div className="grid grid--gap-medium">
            {title}
            {!title && (
              <Typography>
                Replica <strong>{smallReplicaName(replicaName)}</strong>
              </Typography>
            )}
            <ReplicaImage replica={replica} />
            {status}
            {!status && <ReplicaStatus replica={replica} />}
          </div>
          <div className="grid grid--gap-medium">
            {duration}
            {!duration && <ReplicaDuration replica={replica} />}
          </div>
        </div>
      </section>
      <section className="grid grid--gap-medium">
        {state}
        {!state && <ReplicaState replica={replica} />}
      </section>
      <section className="step-log">
        <Typography variant="h4">Log</Typography>
        <AsyncResource asyncState={logState}>
          {replicaLog ? (
            <Code copy download filename={replicaName} autoscroll resizable>
              {replicaLog}
            </Code>
          ) : (
            <Typography>This replica has no log</Typography>
          )}
        </AsyncResource>
      </section>
    </>
  );
};

Replica.propTypes = {
  logState: PropTypes.object.isRequired,
  replica: PropTypes.shape(ReplicaSummaryModel),
  title: PropTypes.element,
  duration: PropTypes.element,
  status: PropTypes.element,
  state: PropTypes.element,
};
