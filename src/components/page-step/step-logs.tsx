import * as PropTypes from 'prop-types';
import AsyncResource from '../async-resource/simple-async-resource';
import './style.css';
import { usePollJobStepLogs } from './use-poll-job-step-logs';
import { useGetJobStepFullLogs } from './use-get-job-step-full-logs';
import { Log, LogDownloadOverrideType } from '../component/log';
import { Accordion, Typography } from '@equinor/eds-core-react';

export interface StepLogsProps {
  appName: string;
  jobName: string;
  stepName: string;
}

export const StepLogs = ({
  appName,
  jobName,
  stepName,
}: StepLogsProps): JSX.Element => {
  const [pollStepLogsState] = usePollJobStepLogs(appName, jobName, stepName);
  const [getStepFullLogsState, downloadFullLog] = useGetJobStepFullLogs(
    appName,
    jobName,
    stepName
  );
  const downloadOverride: LogDownloadOverrideType = {
    status: getStepFullLogsState.status,
    content: getStepFullLogsState.data,
    onDownload: () => downloadFullLog(),
    error: getStepFullLogsState.error,
  };

  return (
    <section className="step-log">
      <AsyncResource asyncState={pollStepLogsState}>
        {pollStepLogsState?.data ? (
          <Accordion className="accordion elevated" chevronPosition="right">
            <Accordion.Item isExpanded>
              <Accordion.Header>
                <Typography variant="h4">Log</Typography>
              </Accordion.Header>
              <Accordion.Panel>
                <Log
                  downloadOverride={downloadOverride}
                  fileName={jobName + stepName}
                  logContent={pollStepLogsState.data}
                ></Log>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ) : (
          <Typography>This replica has no log</Typography>
        )}
      </AsyncResource>
    </section>
  );
};

StepLogs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<StepLogsProps>;
