import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import { useGetJobStepFullLogs } from './use-get-job-step-full-logs';
import { usePollJobStepLogs } from './use-poll-job-step-logs';

import AsyncResource from '../async-resource/another-async-resource';
import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { Log } from '../component/log';
import { RawModel } from '../../models/model-types';
import { RequestState } from '../../state/state-utils/request-states';
import {
  ModelsContainer,
  useGetPipelineJobContainerLogQuery,
  useGetPipelineJobInventoryQuery,
} from '../../store/log-api';

import './style.css';

type BrandedContainerModel = ModelsContainer & { parentId: string };

export interface StepLogsProps {
  appName: string;
  jobName: string;
  stepName: string;
  timeSpan?: { start: Date; end?: Date };
}

function getTimespan(
  span: StepLogsProps['timeSpan']
): RawModel<StepLogsProps['timeSpan']> {
  return {
    ...(span && {
      start: new Date(span.start).toISOString(),
      end: span.end && new Date(span.end.getTime() + 10 * 60000).toISOString(),
    }),
  };
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
  const { data, ...state } = useGetPipelineJobInventoryQuery({
    appName,
    pipelineJobName: jobName,
    ...getTimespan(timeSpan),
  });
  const [container, setContainer] = useState<BrandedContainerModel>();

  useEffect(() => {
    if (state.isSuccess) {
      // flattens and return all containers as a flattened array, branded with parents id
      const flatContainers = data?.replicas.flatMap<BrandedContainerModel>(
        ({ name, containers }) =>
          containers.reduce((obj, x) => [...obj, { ...x, parentId: name }], [])
      );

      setContainer(flatContainers.find(({ name }) => name === stepName));
    }
  }, [data?.replicas, state.isSuccess, stepName]);

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
  const { data, ...state } = useGetPipelineJobContainerLogQuery({
    appName,
    pipelineJobName: jobName,
    replicaName: parentId,
    containerId: id,
    ...getTimespan(timeSpan),
  });

  return (
    <AsyncResource asyncState={state}>
      {data ? (
        <Log logContent={data as string} fileName={`${jobName}_${name}`} />
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
    <SimpleAsyncResource asyncState={persistLog}>
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
    </SimpleAsyncResource>
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
