import * as PropTypes from 'prop-types';

import { useGetDeployments } from './use-get-deployments';
import { Button, List, Radio, Typography } from '@equinor/eds-core-react';
import { promiseHandler } from '../../../utils/promise-handler';
import { copyBatch, restartBatch } from '../../../api/jobs';
import { formatDateTime } from '../../../utils/datetime';
import { useEffect, useState } from 'react';
import { RequestState } from '../../../state/state-utils/request-states';
import { DeploymentItemModel } from '../../../models/radix-api/deployments/deployment-item';
import { infoToast } from '../../global-top-nav/styled-toaster';

import './style.css';

export interface RestartBatchProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  deploymentName: string;
  batchName: string;
  smallBatchName: string;
  onSuccess: () => void;
  onDone: () => void;
}

export const RestartBatch = ({
  appName,
  envName,
  jobComponentName,
  deploymentName,
  batchName,
  smallBatchName,
  onSuccess,
  onDone,
}: RestartBatchProps): JSX.Element => {
  const [deploymentsState] = useGetDeployments(
    appName,
    envName,
    jobComponentName
  );
  const [batchDeployment, setBatchDeployment] =
    useState<DeploymentItemModel>(undefined);
  const [activeDeployment, setActiveDeployment] =
    useState<DeploymentItemModel>(undefined);
  const onRestartBatch = (
    appName: string,
    envName: string,
    jobComponentName: string,
    batchName: string,
    smallBatchName: string,
    useActiveDeployment: boolean,
    activeDeploymentName: string
  ) => {
    if (useActiveDeployment) {
      promiseHandler(
        copyBatch(appName, envName, jobComponentName, batchName, {
          deploymentName: activeDeploymentName,
        }),
        () => {
          infoToast(`Batch '${smallBatchName}' successfully copied.`);
          onSuccess();
        },
        `Error copying batch '${smallBatchName}'`
      );
      onDone();
      return;
    }
    promiseHandler(
      restartBatch(appName, envName, jobComponentName, batchName),
      () => {
        infoToast(`Batch '${smallBatchName}' successfully restarted.`);
        onSuccess();
      },
      `Error restarting batch '${smallBatchName}'`
    );
    onDone();
  };
  const deployments = deploymentsState.data;
  useEffect(() => {
    if (deploymentsState.status === RequestState.SUCCESS) {
      for (const deployment of deployments) {
        if (deployment.name === deploymentName) {
          setBatchDeployment(deployment);
        }
        if (!deployment.activeTo) {
          setActiveDeployment(deployment);
        }
      }
    }
  }, [deploymentsState, deploymentsState.status, deploymentName, deployments]);
  const [useActiveDeploymentOption, setUseActiveDeploymentOption] =
    useState('current');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseActiveDeploymentOption(event.target.value);
  };
  return (
    <div className="restart-job-content">
      {batchDeployment && activeDeployment && (
        <div>
          {batchDeployment.activeTo ? (
            <List className="grid grid--gap-medium">
              <List.Item key="current">
                <div className="grid grid--auto-columns restart-job-deployment-options">
                  <Radio
                    name="deploymentOptions"
                    value="current"
                    checked={useActiveDeploymentOption === 'current'}
                    onChange={onChange}
                  ></Radio>
                  <div className="grid grid--gap-small restart-job-deployment-option">
                    <Typography>
                      Restart with current batch deployment{' '}
                      {batchDeployment.name} (active between{' '}
                      {formatDateTime(batchDeployment.activeFrom)} and{' '}
                      {formatDateTime(batchDeployment.activeTo)}).
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
                    value="active"
                    checked={useActiveDeploymentOption === 'active'}
                    onChange={onChange}
                  ></Radio>
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
                {formatDateTime(activeDeployment.activeFrom)})
              </Typography>
              <Typography className="restart-job-deployment-item">
                Existing batch jobs <strong>{batchName}</strong> <br />
                will be deleted and started again.
              </Typography>
            </>
          )}
        </div>
      )}
      <div className="grid grid--gap-medium">
        <Button.Group className="grid grid--gap-small grid--auto-columns restart-job-buttons">
          <Button
            disabled={deploymentsState.status !== RequestState.SUCCESS}
            onClick={() =>
              onRestartBatch(
                appName,
                envName,
                jobComponentName,
                batchName,
                smallBatchName,
                useActiveDeploymentOption === 'active',
                activeDeployment.name
              )
            }
          >
            Restart
          </Button>
          <Button onClick={onDone}>Cancel</Button>
        </Button.Group>
      </div>
    </div>
  );
};

RestartBatch.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  batchName: PropTypes.string.isRequired,
  smallBatchName: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
} as PropTypes.ValidationMap<RestartBatchProps>;
