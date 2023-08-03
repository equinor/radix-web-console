import { Accordion, Typography } from '@equinor/eds-core-react';

import { useGetFullLogs } from './use-get-task-step-full-logs';
import { usePollLogs } from './use-poll-task-step-logs';
import { Log, LogDownloadOverrideType } from '../component/log';
import { AsyncState } from '../../effects/effect-types';
import { mapRouteParamsToProps } from '../../utils/routing';

export interface PipelineRunTaskStepLogProps {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  taskName: string;
  stepName: string;
  title: string;
  logState?: AsyncState<string>;
}

export const PipelineRunTaskStepLog = ({
  appName,
  jobName,
  pipelineRunName,
  taskName,
  stepName,
  title,
}: PipelineRunTaskStepLogProps): React.JSX.Element => {
  const [pollLogsState] = usePollLogs(
    appName,
    jobName,
    pipelineRunName,
    taskName,
    stepName
  );
  const [getFullLogsState, downloadFullLog] = useGetFullLogs(
    appName,
    jobName,
    pipelineRunName,
    taskName,
    stepName
  );
  const downloadOverride: LogDownloadOverrideType = {
    status: getFullLogsState.status,
    content: getFullLogsState.data,
    onDownload: () => downloadFullLog(),
    error: getFullLogsState.error,
  };

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
          {pollLogsState.data ? (
            <Log
              fileName={stepName}
              logContent={pollLogsState.data}
              downloadOverride={downloadOverride}
            />
          ) : (
            <Typography>No data</Typography>
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'pipelineRunName', 'taskName', 'stepName', 'title'],
  PipelineRunTaskStepLog
);
