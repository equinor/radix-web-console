import { Accordion, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useState } from 'react';

import { useGetJobStepFullLogs } from './use-get-job-step-full-logs';
import { usePollJobStepLogs } from './use-poll-job-step-logs';

import AsyncResource from '../async-resource/simple-async-resource';
import { Log } from '../component/log';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

export interface StepLogsProps {
  appName: string;
  jobName: string;
  stepName: string;
}

export const JobStepLogs: FunctionComponent<StepLogsProps> = ({
  appName,
  jobName,
  stepName,
}) => {
  const [pollStepLogsState] = usePollJobStepLogs(appName, jobName, stepName);
  const [getStepFullLogsState, downloadFullLog] = useGetJobStepFullLogs(
    appName,
    jobName,
    stepName
  );

  const [persistLog, setPersistLog] = useState(pollStepLogsState);
  useEffect(() => {
    if (pollStepLogsState.status !== RequestState.IN_PROGRESS) {
      setPersistLog(pollStepLogsState);
    }
  }, [pollStepLogsState]);

  return (
    <section className="step-log">
      <AsyncResource asyncState={persistLog}>
        {persistLog.data ? (
          <Accordion className="accordion elevated" chevronPosition="right">
            <Accordion.Item isExpanded>
              <Accordion.Header>
                <Accordion.HeaderTitle>
                  <Typography variant="h4">Log</Typography>
                </Accordion.HeaderTitle>
              </Accordion.Header>
              <Accordion.Panel>
                <Log
                  logContent={persistLog.data}
                  fileName={`${jobName}_${stepName}`}
                  downloadOverride={{
                    status: getStepFullLogsState.status,
                    content: getStepFullLogsState.data,
                    onDownload: () => downloadFullLog(),
                    error: getStepFullLogsState.error,
                  }}
                />
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
};
