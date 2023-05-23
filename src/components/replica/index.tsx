import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useState } from 'react';

import AsyncResource from '../async-resource/simple-async-resource';
import { Code } from '../code';
import {
  Log,
  LogDownloadOverrideType,
  LogDownloadOverrideTypeValidationMap,
} from '../component/log';
import { ReplicaImage } from '../replica-image';
import { ReplicaResources } from '../replica-resources';
import { ReplicaStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { AsyncState } from '../../effects/effect-types';
import { useInterval } from '../../effects/use-interval';
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
  resources?: JSX.Element;
}

export interface ReplicaProps extends ReplicaElements {
  replica?: ReplicaSummaryNormalizedModel;
  logState?: AsyncState<string>;
  isCollapsibleOverview?: boolean;
  isCollapsibleLog?: boolean;
  downloadOverride?: LogDownloadOverrideType;
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
  replica: { restartCount, statusMessage },
}: {
  replica: ReplicaSummaryNormalizedModel;
}): JSX.Element => (
  <>
    {!Number.isNaN(restartCount) && restartCount > 0 && (
      <div>
        <Typography>
          Restarted <strong>{restartCount} times</strong>
        </Typography>
      </div>
    )}

    {statusMessage && (
      <>
        <Typography>Status message</Typography>
        <Code>{statusMessage}</Code>
      </>
    )}
  </>
);

const Overview = ({
  replica,
  title,
  duration,
  status,
  state,
  resources,
}: {
  replica: ReplicaSummaryNormalizedModel;
} & ReplicaElements): JSX.Element => (
  <>
    <section className="grid grid--gap-medium overview">
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          {title ||
            (replica && (
              <Typography>
                Replica <strong>{smallReplicaName(replica.name)}</strong>
              </Typography>
            ))}
          <ReplicaImage replica={replica} />
          {status ||
            (replica && <ReplicaStatusBadge status={replica.status} />)}
        </div>
        <div className="grid grid--gap-medium">
          {duration ||
            (replica && <ReplicaDuration created={replica.created} />)}
        </div>
        <div className="grid grid--gap-medium">
          {resources ||
            (replica && <ReplicaResources resources={replica.resources} />)}
        </div>
      </div>
    </section>
    <section className="grid grid--gap-medium">
      {state || (replica && <ReplicaState replica={replica} />)}
    </section>
  </>
);

export const Replica = ({
  replica,
  logState,
  isCollapsibleOverview,
  isCollapsibleLog,
  downloadOverride,
  ...rest
}: ReplicaProps): JSX.Element => (
  <>
    {isCollapsibleOverview ? (
      <Accordion className="accordion elevated" chevronPosition="right">
        <Accordion.Item isExpanded>
          <Accordion.Header>
            <Accordion.HeaderTitle>
              <Typography variant="h4" as="span">
                Overview
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
        <Typography variant="h4">Overview</Typography>
        <Overview replica={replica} {...rest} />
      </>
    )}

    <section className="step-log">
      <AsyncResource asyncState={logState} customError={'No log or replica'}>
        {replica && logState?.data ? (
          isCollapsibleLog ? (
            <Accordion className="accordion elevated" chevronPosition="right">
              <Accordion.Item isExpanded>
                <Accordion.Header>
                  <Accordion.HeaderTitle>
                    <Typography variant="h4" as="span">
                      Log
                    </Typography>
                  </Accordion.HeaderTitle>
                </Accordion.Header>
                <Accordion.Panel>
                  <Log
                    downloadOverride={downloadOverride}
                    fileName={replica.name}
                    logContent={logState.data}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ) : (
            <Log
              downloadOverride={downloadOverride}
              fileName={replica.name}
              logContent={logState.data}
            />
          )
        ) : (
          <Typography>This replica has no log</Typography>
        )}
      </AsyncResource>
    </section>
  </>
);

Replica.propTypes = {
  replica: PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap),
  logState: PropTypes.object,
  isCollapsibleOverview: PropTypes.bool,
  isCollapsibleLog: PropTypes.bool,
  downloadOverride: PropTypes.shape(LogDownloadOverrideTypeValidationMap),
  title: PropTypes.element,
  duration: PropTypes.element,
  status: PropTypes.element,
  state: PropTypes.element,
  resources: PropTypes.element,
} as PropTypes.ValidationMap<ReplicaProps>;
