import { Button, List, Radio, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';

import { useGetDeployments } from './use-get-deployments';

import { infoToast } from '../../global-top-nav/styled-toaster';
import { copyJob, restartJob } from '../../../api/jobs';
import { DeploymentItemModel } from '../../../models/radix-api/deployments/deployment-item';
import { RequestState } from '../../../state/state-utils/request-states';
import { formatDateTime } from '../../../utils/datetime';
import { promiseHandler } from '../../../utils/promise-handler';

import './style.css';

export interface RestartJobProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  deploymentName: string;
  jobName: string;
  smallJobName: string;
  onSuccess: () => void;
  onDone: () => void;
}

export const RestartJob: FunctionComponent<RestartJobProps> = ({
  appName,
  envName,
  jobComponentName,
  deploymentName,
  jobName,
  smallJobName,
  onSuccess,
  onDone,
}) => {
  const [deploymentsState] = useGetDeployments(
    appName,
    envName,
    jobComponentName
  );
  const [jobDeployment, setJobDeployment] = useState<DeploymentItemModel>();
  const [activeDeployment, setActiveDeployment] =
    useState<DeploymentItemModel>();

  const onRestartJob = (
    appName: string,
    envName: string,
    jobComponentName: string,
    jobName: string,
    smallJobName: string,
    useActiveDeployment: boolean,
    activeDeploymentName: string
  ) => {
    if (useActiveDeployment) {
      promiseHandler(
        copyJob(appName, envName, jobComponentName, jobName, {
          deploymentName: activeDeploymentName,
        }),
        () => {
          infoToast(`Job '${smallJobName}' successfully copied.`);
          onSuccess();
        },
        `Error copying job '${smallJobName}'`
      );
    } else {
      promiseHandler(
        restartJob(appName, envName, jobComponentName, jobName),
        () => {
          infoToast(`Job '${smallJobName}' successfully restarted.`);
          onSuccess();
        },
        `Error restarting job '${smallJobName}'`
      );
    }

    onDone();
  };

  const deployments = deploymentsState.data;
  useEffect(() => {
    if (deploymentsState.status === RequestState.SUCCESS) {
      for (const deployment of deployments) {
        if (deployment.name === deploymentName) {
          setJobDeployment(deployment);
        }
        if (!deployment.activeTo) {
          setActiveDeployment(deployment);
        }
      }
    }
  }, [deploymentsState, deploymentsState.status, deploymentName, deployments]);

  const [useActiveDeploymentOption, setUseActiveDeploymentOption] =
    useState('current');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUseActiveDeploymentOption(event.target.value);
  };

  return (
    <div className="restart-job-content">
      {jobDeployment && activeDeployment && (
        <div>
          {jobDeployment.activeTo ? (
            <List className="grid grid--gap-medium">
              <List.Item key="current">
                <div className="grid grid--auto-columns restart-job-deployment-options">
                  <Radio
                    name="deploymentOptions"
                    value="current"
                    checked={useActiveDeploymentOption === 'current'}
                    onChange={onChange}
                  />
                  <div className="grid grid--gap-small restart-job-deployment-option">
                    <Typography>
                      Restart with current job deployment {jobDeployment.name}{' '}
                      (active between {formatDateTime(jobDeployment.activeFrom)}{' '}
                      and {formatDateTime(jobDeployment.activeTo)}).
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
                    value="active"
                    checked={useActiveDeploymentOption === 'active'}
                    onChange={onChange}
                  />
                  <div className="grid grid--gap-small restart-job-deployment-option">
                    <Typography className="restart-job-deployment-option">
                      Create new job with deployment {activeDeployment.name}{' '}
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
                The job deployment <strong>{jobDeployment.name}</strong> is{' '}
                <strong>active</strong> (from:{' '}
                {formatDateTime(activeDeployment.activeFrom)})
              </Typography>
              <Typography className="restart-job-deployment-item">
                Existing job <strong>{jobName}</strong> <br />
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
              onRestartJob(
                appName,
                envName,
                jobComponentName,
                jobName,
                smallJobName,
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

RestartJob.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  smallJobName: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
};
