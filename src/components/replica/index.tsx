import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import React, { FunctionComponent, useState } from 'react';

import AsyncResource from '../async-resource/another-async-resource';
import { Code } from '../code';
import { ReplicaImage } from '../replica-image';
import { ReplicaResources } from '../replica-resources';
import { ReplicaStatusBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { useInterval } from '../../effects/use-interval';
import {
  ReplicaSummaryNormalizedModel,
  ReplicaSummaryNormalizedModelValidationMap,
} from '../../models/radix-api/deployments/replica-summary';
import { FetchQueryResult } from '../../store/types';
import { smallReplicaName } from '../../utils/string';

interface ReplicaElements {
  title?: React.JSX.Element;
  duration?: React.JSX.Element;
  status?: React.JSX.Element;
  state?: React.JSX.Element;
  resources?: React.JSX.Element;
}

export interface ReplicaProps extends ReplicaElements {
  replica: ReplicaSummaryNormalizedModel;
  logState?: FetchQueryResult<string>;
  isCollapsibleOverview?: boolean;
  isCollapsibleLog?: boolean;
  downloadCb?: () => void;
}

const ReplicaDuration: FunctionComponent<{ created: Date }> = ({ created }) => {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 1000);

  return (
    <>
      <Typography>
        Replica created{' '}
        <strong>
          <RelativeToNow time={created} />
        </strong>
      </Typography>
      <Typography>
        Replica duration{' '}
        <strong>
          <Duration start={created} end={now} />
        </strong>
      </Typography>
    </>
  );
};

const ContainerDuration: FunctionComponent<{ started: Date }> = ({
  started,
}) => {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 1000);

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
          <Duration start={started} end={now} />
        </strong>
      </Typography>
    </>
  );
};

const ReplicaState: FunctionComponent<
  Pick<ReplicaSummaryNormalizedModel, 'restartCount' | 'statusMessage'>
> = ({ restartCount, statusMessage }) => (
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

const Overview: FunctionComponent<
  { replica: ReplicaSummaryNormalizedModel } & ReplicaElements
> = ({ replica, title, duration, status, state, resources }) => (
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
          {duration || (
            <>
              <ReplicaDuration created={replica.created} />
              {replica.containerStarted && (
                <ContainerDuration started={replica.containerStarted} />
              )}
            </>
          )}
        </div>
        <div className="grid grid--gap-medium">
          {resources || <ReplicaResources resources={replica.resources} />}
        </div>
      </div>
    </section>
    <section className="grid grid--gap-medium">
      {state || <ReplicaState {...replica} />}
    </section>
  </>
);

export const Replica: FunctionComponent<ReplicaProps> = ({
  logState,
  isCollapsibleOverview,
  isCollapsibleLog,
  downloadCb,
  ...rest
}) => (
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
            <Overview {...rest} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    ) : (
      <>
        <Typography variant="h4">Overview</Typography>
        <Overview {...rest} />
      </>
    )}

    <section>
      <AsyncResource asyncState={logState} errorContent={'No log or replica'}>
        {logState.data ? (
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
                  <Code
                    copy
                    autoscroll
                    resizable
                    download
                    downloadCb={downloadCb}
                  >
                    {logState.data}
                  </Code>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ) : (
            <Code copy autoscroll resizable download downloadCb={downloadCb}>
              {logState.data}
            </Code>
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
    .isRequired as PropTypes.Validator<ReplicaSummaryNormalizedModel>,
  logState: PropTypes.object as PropTypes.Validator<FetchQueryResult<string>>,
  isCollapsibleOverview: PropTypes.bool,
  isCollapsibleLog: PropTypes.bool,
  downloadCb: PropTypes.func,
  title: PropTypes.element,
  duration: PropTypes.element,
  status: PropTypes.element,
  state: PropTypes.element,
  resources: PropTypes.element,
};
