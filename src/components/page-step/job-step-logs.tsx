import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { useGetJobStepFullLogs } from './use-get-job-step-full-logs';
import { usePollJobStepLogs } from './use-poll-job-step-logs';
import AsyncResource from '../async-resource/simple-async-resource';
import { Log, LogDownloadOverrideType } from '../component/log';

import './style.css';

export interface StepLogsProps {
  appName: string;
  jobName: string;
  stepName: string;
}

export const JobStepLogs = ({
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
                <Accordion.HeaderTitle>
                  <Typography variant="h4">Log</Typography>
                </Accordion.HeaderTitle>
              </Accordion.Header>
              <Accordion.Panel>
                <Log
                  downloadOverride={downloadOverride}
                  fileName={jobName + stepName + '.txt'}
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

JobStepLogs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<StepLogsProps>;
