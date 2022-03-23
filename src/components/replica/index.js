import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import AsyncResource from '../async-resource/simple-async-resource';
import { Code } from '../code';
import { ReplicaImage } from '../replica-image';
import { ReplicaStatus } from '../replica-status';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { useInterval } from '../../effects/use-interval';
import { ReplicaSummaryNormalizedModelValidationMap } from '../../models/replica-summary';
import { smallReplicaName } from '../../utils/string';
import * as React from 'react';

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

const Log = ({ fileName, logContent }) => {
  return (
    <>
      <Code copy download filename={fileName} autoscroll resizable>
        {logContent}
      </Code>
    </>
  );
};

const Overview = ({ replica, replicaName, title, duration, status, state }) => {
  return (
    <>
      <section className="grid grid--gap-medium overview">
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
    </>
  );
};

export const Replica = (props) => {
  const {
    logState,
    replica,
    title,
    duration,
    status,
    state,
    isCollapsibleOverview = false,
    isCollapsibleLog = false,
  } = props;
  const replicaLog = logState?.data;

  const [replicaName, setReplicaName] = useState('');
  useEffect(() => setReplicaName(replica?.name ?? ''), [replica]);

  return (
    <>
      {isCollapsibleOverview ? (
        <Accordion.Item className="accordion elevated" isExpanded={true}>
          <Accordion.Header>
            <Typography variant="h4">Overview</Typography>
          </Accordion.Header>
          <Accordion.Panel>
            <Overview
              replica={replica}
              replicaName={replicaName}
              title={title}
              duration={duration}
              status={status}
              state={state}
            ></Overview>
          </Accordion.Panel>
        </Accordion.Item>
      ) : (
        <>
          <Typography variant="h4">Overview</Typography>
          <Overview
            replica={replica}
            replicaName={replicaName}
            title={title}
            duration={duration}
            status={status}
            state={state}
          ></Overview>
        </>
      )}
      <section className="step-log">
        <AsyncResource asyncState={logState}>
          {replicaLog ? (
            isCollapsibleLog ? (
              <Accordion.Item className="accordion elevated" isExpanded={false}>
                <Accordion.Header>
                  <Typography variant="h4">Log</Typography>
                </Accordion.Header>
                <Accordion.Panel>
                  <Log fileName={replicaName} logContent={replicaLog}></Log>
                </Accordion.Panel>
              </Accordion.Item>
            ) : (
              <Log fileName={replicaName} logContent={replicaLog}></Log>
            )
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
  replica: PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap),
  title: PropTypes.element,
  duration: PropTypes.element,
  status: PropTypes.element,
  state: PropTypes.element,
};
