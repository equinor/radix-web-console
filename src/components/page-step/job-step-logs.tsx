import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import AsyncResource from '../async-resource/another-async-resource';
import { Code } from '../code';
import { downloadLazyLogCb } from '../code/log-helper';
import { addMinutes } from 'date-fns';
import {
  ModelsContainer,
  ModelsInventoryResponse,
  useGetPipelineJobContainerLogQuery,
  useGetPipelineJobInventoryQuery,
} from '../../store/log-api';
import {
  radixApi,
  useGetPipelineJobStepLogsQuery,
} from '../../store/radix-api';
import { getFetchErrorCode } from '../../store/utils';

import './style.css';

type BrandedContainerModel = ModelsContainer & { parentId: string };

export interface StepLogsProps {
  appName: string;
  jobName: string;
  stepName: string;
  start?: string;
  end?: string;
}

function findContainer(data: ModelsInventoryResponse, stepName: string) {
  for (const replica of data?.replicas ?? []) {
    for (const container of replica.containers) {
      if (container.name === stepName) {
        return { ...container, parentId: replica.name };
      }
    }
  }
  return null;
}

function HistoricalLog({
  appName,
  jobName,
  stepName,
  start,
  end,
}: StepLogsProps) {
  end = end ? addMinutes(new Date(end), 10).toISOString() : null;
  const { container, ...state } = useGetPipelineJobInventoryQuery(
    { appName, pipelineJobName: jobName, start, end },
    {
      skip: !appName || !jobName,
      selectFromResult: ({ data, ...state }) => ({
        container: data ? findContainer(data, stepName) : null,
        ...state,
      }),
    }
  );

  return (
    <AsyncResource asyncState={state}>
      {container ? (
        <ContainerLog
          jobName={jobName}
          appName={appName}
          start={start}
          end={end}
          container={container}
        />
      ) : (
        <Typography>This replica has no log</Typography>
      )}
    </AsyncResource>
  );
}

type ContainerLogProps = {
  appName: string;
  jobName: string;
  container: BrandedContainerModel;
  start?: string;
  end?: string;
};
function ContainerLog({
  appName,
  container: { name, parentId, id },
  jobName,
  start,
  end,
}: ContainerLogProps) {
  end = end ? addMinutes(new Date(end), 10).toISOString() : null;
  const { data, ...state } = useGetPipelineJobContainerLogQuery(
    {
      appName,
      pipelineJobName: jobName,
      replicaName: parentId,
      containerId: id,
      start,
      end,
    },
    { skip: !appName || !jobName || !parentId || !id }
  );

  return (
    <AsyncResource asyncState={state}>
      {data ? (
        <Code
          copy
          autoscroll
          resizable
          download
          filename={`${jobName}_${name}.txt`}
        >
          {data as string}
        </Code>
      ) : (
        <Typography>This replica has no log</Typography>
      )}
    </AsyncResource>
  );
}

export function JobStepLogs({
  appName,
  jobName,
  stepName,
  start,
  end,
}: StepLogsProps) {
  const [pollingInterval, setPollingInterval] = useState(5000);
  const [getLog] = radixApi.endpoints.getPipelineJobStepLogs.useLazyQuery();
  const { data: liveLog, ...state } = useGetPipelineJobStepLogsQuery(
    { appName, jobName, stepName, lines: '1000' },
    { skip: !appName || !jobName || !stepName, pollingInterval }
  );

  const notFound = state.isError && getFetchErrorCode(state.error) === 404;

  useEffect(() => {
    setPollingInterval(notFound || end ? 0 : 5000);
  }, [notFound, end]);

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4">Log</Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          {notFound ? (
            <HistoricalLog
              appName={appName}
              jobName={jobName}
              stepName={stepName}
              start={start}
              end={end}
            />
          ) : (
            <AsyncResource asyncState={state}>
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
                <Typography>This replica has no log</Typography>
              )}
            </AsyncResource>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

JobStepLogs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
  start: PropTypes.string,
  end: PropTypes.string,
};
