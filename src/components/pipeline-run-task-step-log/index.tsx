import { mapRouteParamsToProps } from '../../utils/routing';
import { Accordion, Typography } from '@equinor/eds-core-react';
import { AsyncPollingStatus } from '../../effects/use-async-polling';
import { usePollLogs } from './use-poll-task-step-logs';
import { Log } from '../component/log';

export interface PipelineRunTaskStepLogProps {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  taskName: string;
  stepName: string;
  logState?: AsyncPollingStatus<string>;
}

const PipelineRunTaskStepLog = ({
  appName,
  jobName,
  pipelineRunName,
  taskName,
  stepName,
}: PipelineRunTaskStepLogProps): JSX.Element => {
  const [logsState] = usePollLogs(
    appName,
    jobName,
    pipelineRunName,
    taskName,
    stepName
  );

  return (
    <>
      <Accordion className="accordion elevated" chevronPosition="right">
        <Accordion.Item isExpanded>
          <Accordion.Header>
            <Typography variant="h4">Log</Typography>
          </Accordion.Header>
          <Accordion.Panel>
            <Log fileName={stepName} logContent={logsState.data}></Log>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'pipelineRunName', 'taskName', 'stepName'],
  PipelineRunTaskStepLog
);
