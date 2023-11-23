import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import AsyncResource, {
  getErrorData,
} from '../async-resource/another-async-resource';
import { Code } from '../code';
import { downloadLazyLogCb } from '../code/log-helper';
import { Log } from '../component/log';
import { RawModel } from '../../models/model-types';
import {
  ModelsContainer,
  useGetPipelineJobContainerLogQuery,
  useGetPipelineJobInventoryQuery,
} from '../../store/log-api';
import {
  radixApi,
  useGetPipelineJobStepLogsQuery,
} from '../../store/radix-api';

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
      start: span.start.toISOString(),
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
  const { data, ...state } = useGetPipelineJobInventoryQuery(
    { appName, pipelineJobName: jobName, ...getTimespan(timeSpan) },
    { skip: !appName || !jobName }
  );
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
  const { data, ...state } = useGetPipelineJobContainerLogQuery(
    {
      appName,
      pipelineJobName: jobName,
      replicaName: parentId,
      containerId: id,
      ...getTimespan(timeSpan),
    },
    { skip: !appName || !jobName || !parentId || !id }
  );

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
  const [pollingInterval, setPollingInterval] = useState(5000);
  const [getLog] = radixApi.endpoints.getPipelineJobStepLogs.useLazyQuery();
  const { data: liveLog, ...liveLogState } = useGetPipelineJobStepLogsQuery(
    { appName, jobName, stepName, lines: '1000' },
    { skip: !appName || !jobName || !stepName, pollingInterval }
  );

  const pollLogFailedAndNotFound =
    liveLogState.isError && getErrorData(liveLogState.error)?.code === 404;
  useEffect(() => {
    setPollingInterval(pollLogFailedAndNotFound || timeSpan?.end ? 0 : 5000);
  }, [pollLogFailedAndNotFound, timeSpan?.end]);

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4">Log</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          {pollLogFailedAndNotFound ? (
            <HistoricalLog {...{ appName, jobName, stepName, timeSpan }} />
          ) : (
            <AsyncResource asyncState={liveLogState}>
              {liveLog ? (
                <Code
                  copy
                  autoscroll
                  resizable
                  download
                  downloadCb={downloadLazyLogCb(
                    `${jobName}_${stepName}.txt`,
                    getLog,
                    { appName, jobName, stepName, file: 'true' },
                    false
                  )}
                >
                  {liveLog}
                </Code>
              ) : (
                <NoLog />
              )}
            </AsyncResource>
          )}
        </Accordion.Panel>
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
