import { Accordion, Typography } from '@equinor/eds-core-react';
import type React from 'react';
import { useEffect, useState } from 'react';

import { useInterval } from '../../effects/use-interval';
import type { ReplicaSummary } from '../../store/radix-api';
import type { FetchQueryResult } from '../../store/types';
import { smallReplicaName } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Code } from '../code';
import { ReplicaImage } from '../replica-image';
import { ResourceRequirements } from '../resource-requirements';
import { ReplicaStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';

interface ReplicaElements {
  title?: React.JSX.Element;
  duration?: React.JSX.Element;
  status?: React.JSX.Element;
  state?: React.JSX.Element;
}

type ReplicaDurationProps = { created: number | string | Date; ended?: Date };
const ReplicaDuration = ({ created: started, ended }: ReplicaDurationProps) => {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 1000);

  return (
    <>
      <Typography>
        Replica created{' '}
        <strong>
          <RelativeToNow time={started} />
        </strong>
      </Typography>
      {ended && (
        <Typography>
          Replica ended{' '}
          <strong>
            <RelativeToNow time={ended} />
          </strong>
        </Typography>
      )}
      <Typography>
        Replica duration{' '}
        <strong>
          <Duration start={started} end={ended || now} />
        </strong>
      </Typography>
    </>
  );
};

type ContainerDurationProps = { started: number | string | Date; ended?: Date };
const ContainerDuration = ({ started, ended }: ContainerDurationProps) => {
  useInterval(() => setNow(new Date()), 1000);
  const [now, setNow] = useState(new Date());

  return (
    <>
      <Typography>
        Container started{' '}
        <strong>
          <RelativeToNow time={started} />
        </strong>
      </Typography>
      <Typography>
        Container duration{' '}
        <strong>
          <Duration start={started} end={ended || now} />
        </strong>
      </Typography>
    </>
  );
};

type ReplicaStateProps = {
  restartCount: ReplicaSummary['restartCount'];
  statusMessage: ReplicaSummary['statusMessage'];
  exitCode: ReplicaSummary['exitCode'];
};
const ReplicaState = ({
  restartCount,
  statusMessage,
  exitCode,
}: ReplicaStateProps) => (
  <>
    {restartCount && restartCount > 0 && (
      <div>
        <Typography>
          Restarted <strong>{restartCount} times</strong>
        </Typography>
      </div>
    )}
    {exitCode != undefined && exitCode != 0 && (
      <Typography>
        Exit code <strong>{exitCode}</strong>
      </Typography>
    )}

    {statusMessage && (
      <>
        <Typography>Status message</Typography>
        <Code>{statusMessage}</Code>
      </>
    )}
  </>
);

type OverviewProps = { replica: ReplicaSummary } & ReplicaElements;
const Overview = ({
  replica,
  title,
  duration,
  status,
  state,
}: OverviewProps) => {
  return (
    <>
      <section className="grid grid--gap-medium overview">
        <div className="grid grid--gap-medium grid--overview-columns">
          <div className="grid grid--gap-medium">
            {title || (
              <Typography>
                Replica <strong>{smallReplicaName(replica.name)}</strong>
              </Typography>
            )}
            <ReplicaImage replica={replica} />
            {status || (
              <ReplicaStatusBadge
                status={replica.replicaStatus?.status ?? 'Pending'}
              />
            )}
          </div>
          <div className="grid grid--gap-medium">
            {duration || (
              <>
                <ReplicaDuration
                  created={replica.created}
                  ended={
                    replica.endTime ? new Date(replica.endTime) : undefined
                  }
                />
                {replica.containerStarted && (
                  <ContainerDuration
                    started={new Date(replica.containerStarted)}
                    ended={
                      replica.endTime ? new Date(replica.endTime) : undefined
                    }
                  />
                )}
              </>
            )}
          </div>
          <div className="grid grid--gap-medium">
            {replica.resources && (
              <ResourceRequirements resources={replica.resources} />
            )}
          </div>
        </div>
      </section>
      <section className="grid grid--gap-medium">
        {state || (
          <ReplicaState
            restartCount={replica.restartCount}
            statusMessage={replica.statusMessage}
            exitCode={replica.exitCode}
          />
        )}
      </section>
    </>
  );
};

type RepliceLogProps = {
  isCollapsibleLog?: boolean;
  isLogExpanded?: boolean;
  downloadCb?: () => unknown;
  log?: string;
  logState?: FetchQueryResult<string>;
};
const ReplicaLog = ({
  isCollapsibleLog,
  isLogExpanded,
  downloadCb,
  log,
  logState,
}: RepliceLogProps) => (
  <>
    {isCollapsibleLog ? (
      <Accordion className="accordion elevated" chevronPosition="right">
        <Accordion.Item isExpanded={isLogExpanded ?? true}>
          <Accordion.Header>
            <Accordion.HeaderTitle>
              <Typography variant="h4" as="span">
                Log
              </Typography>
            </Accordion.HeaderTitle>
          </Accordion.Header>
          <Accordion.Panel>
            <Code copy autoscroll resizable download downloadCb={downloadCb}>
              {(log || logState?.data) ?? ''}
            </Code>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    ) : (
      <Code copy autoscroll resizable download downloadCb={downloadCb}>
        {(log || logState?.data) ?? ''}
      </Code>
    )}
  </>
);

type ReplicaProps = {
  header?: string;
  replica: ReplicaSummary;
  logState?: FetchQueryResult<string>;
  getLog?: () => Promise<string>;
  isCollapsibleOverview?: boolean;
  isCollapsibleLog?: boolean;
  downloadCb: () => unknown;
  downloadHistoryCb?: () => unknown;
  isLogExpanded?: boolean;
  getHistoryLog?: () => Promise<unknown>;
} & ReplicaElements;
export const Replica = ({
  header,
  logState,
  getLog,
  isCollapsibleOverview,
  isCollapsibleLog,
  downloadCb,
  downloadHistoryCb,
  isLogExpanded,
  getHistoryLog,
  replica,
  ...rest
}: ReplicaProps) => {
  const [log, setLog] = useState('');
  const [historyLog, setHistoryLog] = useState('');

  // biome-ignore lint/correctness/useExhaustiveDependencies: unknown ignore
  useEffect(() => {
    if (logState?.data) {
      return;
    }
    getLog?.().then(setLog);
  }, [replica, logState?.data]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: unknown ignore
  useEffect(() => {
    if (logState?.data || log) {
      return;
    }
    getHistoryLog?.().then((data: unknown) => setHistoryLog(data as string));
  }, [replica, logState?.data]);

  return (
    <>
      {isCollapsibleOverview ? (
        <Accordion className="accordion elevated" chevronPosition="right">
          <Accordion.Item isExpanded>
            <Accordion.Header>
              <Accordion.HeaderTitle>
                <Typography variant="h4" as="span">
                  {header || 'Overview'}
                </Typography>
              </Accordion.HeaderTitle>
            </Accordion.Header>
            <Accordion.Panel>
              <Overview replica={replica} {...rest} />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ) : (
        <>
          <Typography variant="h4">{header || 'Overview'}</Typography>
          <Overview replica={replica} {...rest} />
        </>
      )}

      <section>
        {logState?.data ? (
          <AsyncResource
            asyncState={logState}
            errorContent={'No log or replica'}
          >
            <ReplicaLog
              isCollapsibleLog={isCollapsibleLog}
              isLogExpanded={isLogExpanded}
              downloadCb={downloadCb}
              logState={logState}
            />
          </AsyncResource>
        ) : log || historyLog ? (
          <ReplicaLog
            isCollapsibleLog={isCollapsibleLog}
            isLogExpanded={isLogExpanded}
            downloadCb={log ? downloadCb : downloadHistoryCb}
            log={log || historyLog}
          />
        ) : (
          <>Replica has no log</>
        )}
      </section>
    </>
  );
};
