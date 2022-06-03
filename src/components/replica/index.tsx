import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useState } from 'react';

import AsyncResource from '../async-resource/simple-async-resource';
import { Code } from '../code';
import { ReplicaImage } from '../replica-image';
import { ReplicaStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { AsyncState } from '../../effects/effect-types';
import { useInterval } from '../../effects/use-interval';
import { ReplicaStatus } from '../../models/replica-status';
import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../../models/replica-summary';
import { smallReplicaName } from '../../utils/string';

interface ReplicaElements {
  title?: JSX.Element;
  duration?: JSX.Element;
  status?: JSX.Element;
  state?: JSX.Element;
}

export interface ReplicaProps extends ReplicaElements {
  replica: ReplicaSummaryNormalizedModel;
  logState?: AsyncState<string>;
  isCollapsibleOverview?: boolean;
  isCollapsibleLog?: boolean;
}

const ReplicaDuration = ({ created }: { created: Date }): JSX.Element => {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 1000);

  return (
    <>
      <Typography>
        Created{' '}
        <strong>
          <RelativeToNow time={created} />
        </strong>
      </Typography>
      <Typography>
        Duration{' '}
        <strong>
          <Duration start={created} end={now} />
        </strong>
      </Typography>
    </>
  );
};

const ReplicaState = ({
  replica,
}: {
  replica: ReplicaSummaryNormalizedModel;
}): JSX.Element => (
  <>
    {replica.status !== ReplicaStatus.Running && replica.statusMessage && (
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
);

const Log = ({
  fileName,
  logContent,
}: {
  fileName: string;
  logContent: string;
}): JSX.Element => (
  <Code copy download filename={fileName} autoscroll resizable>
    {logContent}
  </Code>
);

const Overview = ({
  replica,
  title,
  duration,
  status,
  state,
}: {
  replica: ReplicaSummaryNormalizedModel;
} & ReplicaElements): JSX.Element => (
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
          {status || <ReplicaStatusBadge status={replica.status} />}
        </div>
        <div className="grid grid--gap-medium">
          {duration || <ReplicaDuration created={replica.created} />}
        </div>
      </div>
    </section>
    <section className="grid grid--gap-medium">
      {state || <ReplicaState replica={replica} />}
    </section>
  </>
);

export const Replica = ({
  replica,
  logState,
  title,
  duration,
  status,
  state,
  isCollapsibleOverview,
  isCollapsibleLog,
}: ReplicaProps): JSX.Element => (
  <>
    {isCollapsibleOverview ? (
      <Accordion className="accordion elevated" chevronPosition="right">
        <Accordion.Item isExpanded>
          <Accordion.Header>
            <Typography variant="h4">Overview</Typography>
          </Accordion.Header>
          <Accordion.Panel>
            <Overview
              replica={replica}
              title={title}
              duration={duration}
              status={status}
              state={state}
            ></Overview>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    ) : (
      <>
        <Typography variant="h4">Overview</Typography>
        <Overview
          replica={replica}
          title={title}
          duration={duration}
          status={status}
          state={state}
        ></Overview>
      </>
    )}
    <section className="step-log">
      <AsyncResource asyncState={logState}>
        {logState?.data ? (
          isCollapsibleLog ? (
            <Accordion className="accordion elevated" chevronPosition="right">
              <Accordion.Item isExpanded>
                <Accordion.Header>
                  <Typography variant="h4">Log</Typography>
                </Accordion.Header>
                <Accordion.Panel>
                  <Log fileName={replica.name} logContent={logState.data}></Log>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ) : (
            <Log fileName={replica.name} logContent={logState.data}></Log>
          )
        ) : (
          <Typography>This replica has no log</Typography>
        )}
      </AsyncResource>
    </section>
  </>
);

Replica.propTypes = {
  replica: PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap)
    .isRequired,
  logState: PropTypes.object,
  title: PropTypes.element,
  duration: PropTypes.element,
  status: PropTypes.element,
  state: PropTypes.element,
  isCollapsibleOverview: PropTypes.bool,
  isCollapsibleLog: PropTypes.bool,
} as PropTypes.ValidationMap<ReplicaProps>;
