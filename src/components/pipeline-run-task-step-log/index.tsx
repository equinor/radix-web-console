import { mapRouteParamsToProps } from '../../utils/routing';
import { Accordion, Typography } from '@equinor/eds-core-react';
import { usePollLogs } from './use-poll-task-step-logs';
import { Log } from '../component/log';
import { AsyncState } from '../../effects/effect-types';

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
}: PipelineRunTaskStepLogProps): JSX.Element => {
  const [logsState] = usePollLogs(
    appName,
    jobName,
    pipelineRunName,
    taskName,
    stepName
  );

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
          {logsState.data ? (
            <Log fileName={stepName} logContent={logsState.data}></Log>
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
