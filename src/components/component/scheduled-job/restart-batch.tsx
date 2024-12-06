import { Button, List, Radio, Typography } from '@equinor/eds-core-react';
import { useState } from 'react';

import { formatDateTime } from '../../../utils/datetime';
import { errorToast, infoToast } from '../../global-top-nav/styled-toaster';

import './style.css';
import { pollingInterval } from '../../../store/defaults';
import {
  useCopyBatchMutation,
  useGetJobComponentDeploymentsQuery,
  useRestartBatchMutation,
} from '../../../store/radix-api';

interface Props {
  appName: string;
  envName: string;
  jobComponentName: string;
  deploymentName: string;
  batchName: string;
  smallBatchName: string;
  onSuccess?: () => unknown;
  onDone?: () => unknown;
}

export function RestartBatch({
  appName,
  envName,
  jobComponentName,
  deploymentName,
  batchName,
  smallBatchName,
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
  const [copyBatch] = useCopyBatchMutation();
  const [restartBatch] = useRestartBatchMutation();
  const batchDeployment = deployments?.find((d) => d.name === deploymentName);
  const activeDeployment = deployments?.find((d) => !d.activeTo);
  const [shouldRestart, setShouldRestart] = useState(true);

  async function onCopyBatch(activeDeploymentName: string) {
    try {
      await copyBatch({
        appName,
        envName,
        batchName,
        jobComponentName,
        scheduledBatchRequest: { deploymentName: activeDeploymentName },
      }).unwrap();

      infoToast(`Batch '${smallBatchName}' successfully copied.`);
      onSuccess?.();
    } catch (e) {
      errorToast(`Error copying batch '${smallBatchName}'`);
    } finally {
      onDone?.();
    }
  }

  async function onRestartBatch() {
    try {
      await restartBatch({
        appName,
        envName,
        jobComponentName,
        batchName,
      }).unwrap();
      infoToast(`Batch '${smallBatchName}' successfully restarted.`);
      onSuccess?.();
    } catch (e) {
      errorToast(`Error restarting batch '${smallBatchName}'`);
    } finally {
      onDone?.();
    }
  }

  if (!batchDeployment) {
    return null;
  }

  return (
    <div className="restart-job-content">
      {batchDeployment.activeTo && activeDeployment ? (
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
                  Restart with current batch deployment {batchDeployment.name}{' '}
                  (active between {formatDateTime(batchDeployment.activeFrom)}{' '}
                  and {formatDateTime(batchDeployment.activeTo)}).
                </Typography>
                <Typography>
                  Existing batch jobs <strong>{batchName}</strong> <br />
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
                  Create new batch with deployment {activeDeployment.name}{' '}
                  (active from {formatDateTime(activeDeployment.activeFrom)}
                  ).
                </Typography>
              </div>
            </div>
          </List.Item>
        </List>
      ) : (
        <>
          <Typography className="restart-job-deployment-item">
            The batch deployment <strong>{batchDeployment.name}</strong> is{' '}
            <strong>active</strong> (from:{' '}
            {formatDateTime(batchDeployment.activeFrom)})
          </Typography>
          <Typography className="restart-job-deployment-item">
            Existing batch jobs <strong>{batchName}</strong> <br />
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
                ? onRestartBatch()
                : onCopyBatch(activeDeployment!.name);
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
