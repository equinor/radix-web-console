import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import { useGetJobStepFullLogs } from './use-get-job-step-full-logs';
import { useGetPipelineContainerLog } from './use-get-pipeline-container-log';
import { useGetPipelineInventory } from './use-get-pipeline-inventory';
import { usePollJobStepLogs } from './use-poll-job-step-logs';

import AsyncResource from '../async-resource/simple-async-resource';
import { Log } from '../component/log';
import { ContainerModel } from '../../models/log-api/models/container';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

type BrandedContainerModel = ContainerModel & { parentId: string };

export interface StepLogsProps {
  appName: string;
  jobName: string;
  stepName: string;
  timeSpan?: { start: Date; end?: Date };
}

const NoLog: FunctionComponent = () => (
  <Typography>This replica has no log</Typography>
);

const HistoricalLog: FunctionComponent<StepLogsProps> = ({
  appName,
  jobName,
  stepName,
  timeSpan,
}) => {
  const [{ data, ...state }] = useGetPipelineInventory(
    appName,
    jobName,
    timeSpan
  );
  const [container, setContainer] = useState<BrandedContainerModel>();

  useEffect(() => {
    if (state.status === RequestState.SUCCESS) {
      // flattens and return all containers as a flattened array, branded with parents id
      const flatContainers = data?.replicas.flatMap<BrandedContainerModel>(
        ({ name, containers }) =>
          containers.reduce((obj, x) => [...obj, { ...x, parentId: name }], [])
      );

      setContainer(flatContainers.find(({ name }) => name === stepName));
    }
  }, [data?.replicas, state.status, stepName]);

  return (
    <AsyncResource asyncState={state}>
      {container ? (
        <ContainerLog
          {...{ appName, jobName, timeSpan }}
          container={container}
        />
      ) : (
        <NoLog />
      )}
    </AsyncResource>
  );
};

const ContainerLog: FunctionComponent<
  { container: BrandedContainerModel } & Pick<
    StepLogsProps,
    'appName' | 'jobName' | 'timeSpan'
  >
> = ({ appName, container: { name, parentId, id }, jobName, timeSpan }) => {
  const [{ data, ...state }] = useGetPipelineContainerLog(
    appName,
    jobName,
    parentId,
    id,
    timeSpan
  );

  return (
    <AsyncResource asyncState={state}>
      {data ? (
        <Log logContent={data} fileName={`${jobName}_${name}`} />
      ) : (
        <NoLog />
      )}
    </AsyncResource>
  );
};

export const JobStepLogs: FunctionComponent<StepLogsProps> = ({
  appName,
  jobName,
  stepName,
  timeSpan,
}) => {
  const [logState, getLog] = useGetJobStepFullLogs(appName, jobName, stepName);

  const [pollInterval, setPollInterval] = useState(5000);
  const [pollLogState] = usePollJobStepLogs(
    appName,
    jobName,
    stepName,
    pollInterval
  );
  const [persistLog, setPersistLog] = useState(pollLogState);

  const pollLogFailedAndNotFound =
    pollLogState.status === RequestState.FAILURE && pollLogState.code === 404;

  useEffect(() => {
    if (pollLogFailedAndNotFound) {
      setPollInterval(null);
    } else if (pollLogState.status !== RequestState.IN_PROGRESS) {
      setPersistLog(pollLogState);

      if (timeSpan?.end) {
        setPollInterval(null);
      }
    }
  }, [pollLogFailedAndNotFound, pollLogState, timeSpan?.end]);

  const logComponent = pollLogFailedAndNotFound ? (
    <HistoricalLog {...{ appName, jobName, stepName, timeSpan }} />
  ) : (
    <AsyncResource asyncState={persistLog}>
      {persistLog.data ? (
        <Log
          logContent={persistLog.data}
          fileName={`${jobName}_${stepName}`}
          downloadOverride={{
            status: logState.status,
            content: logState.data,
            onDownload: () => getLog(),
            error: logState.error,
          }}
        />
      ) : (
        <NoLog />
      )}
    </AsyncResource>
  );

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4">Log</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>{logComponent}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

JobStepLogs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
  timeSpan: PropTypes.shape<PropTypes.ValidationMap<StepLogsProps['timeSpan']>>(
    {
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date),
    }
  ) as PropTypes.Validator<StepLogsProps['timeSpan']>,
};
