import { Accordion, Typography } from '@equinor/eds-core-react';

import AsyncResource from '../async-resource/another-async-resource';
import { Code } from '../code';
import { downloadLazyLogCb } from '../code/log-helper';
import {
  radixApi,
  useGetTektonPipelineRunTaskStepLogsQuery,
} from '../../store/radix-api';

interface Props {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  taskName: string;
  stepName: string;
  title: string;
}

export function PipelineRunTaskStepLog({
  appName,
  jobName,
  pipelineRunName,
  taskName,
  stepName,
  title,
}: Props) {
  const { data: log, ...logState } = useGetTektonPipelineRunTaskStepLogsQuery(
    { appName, jobName, pipelineRunName, taskName, stepName, lines: '1000' },
    { pollingInterval: 5000 }
  );
  const [getLog] =
    radixApi.endpoints.getTektonPipelineRunTaskStepLogs.useLazyQuery();

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4" as="span">
              {title}
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <AsyncResource asyncState={logState}>
            {log ? (
              <Code
                copy
                resizable
                autoscroll
                download
                downloadCb={downloadLazyLogCb(
                  `${stepName}.txt`,
                  getLog,
                  {
                    appName,
                    jobName,
                    pipelineRunName,
                    taskName,
                    stepName,
                    file: 'true',
                  },
                  false
                )}
              >
                {log}
              </Code>
            ) : (
              <Typography>No data</Typography>
            )}
          </AsyncResource>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}
