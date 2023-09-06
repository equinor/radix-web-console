import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import React, { FunctionComponent, useState } from 'react';

import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
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
} from '../../models/radix-api/deployments/replica-summary';
import { smallReplicaName } from '../../utils/string';

interface ReplicaElements {
  title?: React.JSX.Element;
  duration?: React.JSX.Element;
  status?: React.JSX.Element;
  state?: React.JSX.Element;
  resources?: React.JSX.Element;
}

export interface ReplicaProps extends ReplicaElements {
  replica?: ReplicaSummaryNormalizedModel;
  logState?: AsyncState<string>;
  isCollapsibleOverview?: boolean;
  isCollapsibleLog?: boolean;
  downloadOverride?: LogDownloadOverrideType;
}

const ReplicaDuration: FunctionComponent<{ created: Date }> = ({ created }) => {
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
      {state || (replica && <ReplicaState {...replica} />)}
    </section>
  </>
);

export const Replica: FunctionComponent<ReplicaProps> = ({
  replica,
  logState,
  isCollapsibleOverview,
  isCollapsibleLog,
  downloadOverride,
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
      <SimpleAsyncResource
        asyncState={logState}
        errorContent={'No log or replica'}
      >
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
      </SimpleAsyncResource>
    </section>
  </>
);

Replica.propTypes = {
  replica: PropTypes.shape(
    ReplicaSummaryNormalizedModelValidationMap
  ) as PropTypes.Validator<ReplicaSummaryNormalizedModel>,
  logState: PropTypes.object as PropTypes.Validator<AsyncState<string>>,
  isCollapsibleOverview: PropTypes.bool,
  isCollapsibleLog: PropTypes.bool,
  downloadOverride: PropTypes.shape(
    LogDownloadOverrideTypeValidationMap
  ) as PropTypes.Validator<LogDownloadOverrideType>,
  title: PropTypes.element,
  duration: PropTypes.element,
  status: PropTypes.element,
  state: PropTypes.element,
  resources: PropTypes.element,
};
