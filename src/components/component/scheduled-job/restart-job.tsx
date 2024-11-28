import { Button, List, Radio, Typography } from '@equinor/eds-core-react';
import { useState } from 'react';

import { formatDateTime } from '../../../utils/datetime';
import { errorToast, infoToast } from '../../global-top-nav/styled-toaster';

import './style.css';
import { pollingInterval } from '../../../store/defaults';
import {
  useCopyJobMutation,
  useGetJobComponentDeploymentsQuery,
  useRestartJobMutation,
} from '../../../store/radix-api';

interface Props {
  appName: string;
  envName: string;
  jobComponentName: string;
  deploymentName: string;
  jobName: string;
  smallJobName: string;
  onSuccess?: () => void;
  onDone: () => void;
}

export function RestartJob({
  appName,
  envName,
  jobComponentName,
  deploymentName,
  jobName,
  smallJobName,
  onSuccess,
  onDone,
}: Props) {
  const { data: deployments, isLoading } = useGetJobComponentDeploymentsQuery(
    {
      appName,
      envName,
      jobComponentName,
    },
    { pollingInterval }
  );
  const [restartJob] = useRestartJobMutation();
  const [copyJob] = useCopyJobMutation();
  const jobDeployment = deployments?.find((d) => d.name === deploymentName);
  const activeDeployment = deployments?.find((d) => !d.activeTo);
  const [shouldRestart, setShouldRestart] = useState(true);

  async function onCopyJob(activeDeploymentName: string) {
    try {
      await copyJob({
        appName,
        envName,
        jobComponentName,
        jobName,
        scheduledJobRequest: {
          deploymentName: activeDeploymentName,
        },
      }).unwrap();
      infoToast(`Job '${smallJobName}' successfully copied.`);
      onSuccess?.();
    } catch {
      errorToast(`Error copying job '${smallJobName}'`);
    } finally {
      onDone();
    }
  }

  const onRestartJob = async () => {
    try {
      await restartJob({
        appName,
        envName,
        jobComponentName,
        jobName,
      }).unwrap();
      infoToast(`Job '${smallJobName}' successfully restarted.`);
      onSuccess?.();
    } catch (e) {
      errorToast(`Error restarting job '${smallJobName}'`);
    } finally {
      onDone();
    }
  };

  if (!jobDeployment) {
    return null;
  }

  return (
    <div className="restart-job-content">
      {jobDeployment.activeTo && activeDeployment ? (
        <List className="grid grid--gap-medium">
          <List.Item key="current">
            <div className="grid grid--auto-columns restart-job-deployment-options">
              <Radio
                name="deploymentOptions"
                value="restart"
                checked={shouldRestart}
                onChange={() => setShouldRestart(true)}
              />
              <div className="grid grid--gap-small restart-job-deployment-option">
                <Typography>
                  Restart with current job deployment {jobDeployment.name}{' '}
                  (active between {formatDateTime(jobDeployment.activeFrom)} and{' '}
                  {formatDateTime(jobDeployment.activeTo)}).
                </Typography>
                <Typography>
                  Existing job <strong>{jobName}</strong> <br />
                  will be deleted and started again.
                </Typography>
              </div>
            </div>
          </List.Item>
          <List.Item key="active">
            <div className="grid grid--auto-columns restart-job-deployment-options">
              <Radio
                name="deploymentOptions"
                value="copy"
                checked={!shouldRestart}
                onChange={() => setShouldRestart(false)}
              />
              <div className="grid grid--gap-small restart-job-deployment-option">
                <Typography className="restart-job-deployment-option">
                  Create new job with deployment {activeDeployment.name} (active
                  from {formatDateTime(activeDeployment.activeFrom)}
                  ).
                </Typography>
              </div>
            </div>
          </List.Item>
        </List>
      ) : (
        <>
          <Typography className="restart-job-deployment-item">
            The job deployment <strong>{jobDeployment.name}</strong> is{' '}
            <strong>active</strong> (from:{' '}
            {formatDateTime(jobDeployment.activeFrom)})
          </Typography>
          <Typography className="restart-job-deployment-item">
            Existing job <strong>{jobName}</strong> <br />
            will be deleted and started again.
          </Typography>
        </>
      )}
      <div className="grid grid--gap-medium">
        <Button.Group className="grid grid--gap-small grid--auto-columns restart-job-buttons">
          <Button
            disabled={isLoading || (!shouldRestart && !activeDeployment)}
            onClick={() => {
              shouldRestart
                ? onRestartJob()
                : onCopyJob(activeDeployment!.name); //Button will be disabled if activeDeployment is undefined
            }}
          >
            Restart
          </Button>
          <Button onClick={onDone}>Cancel</Button>
        </Button.Group>
      </div>
    </div>
  );
}
