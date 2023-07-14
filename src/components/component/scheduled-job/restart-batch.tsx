import * as PropTypes from 'prop-types';

import { useGetDeployments } from './use-get-deployments';
import { Button, Typography } from '@equinor/eds-core-react';
import { promiseHandler } from '../../../utils/promise-handler';
import { restartBatch, restartJob } from '../../../api/jobs';

import './style.css';

export interface RestartBatchProps {
  appName: string;
  envName: string;
  jobComponentName: string;
  batchName: string;
  smallBatchName: string;
  onSuccess: () => void;
  onDone: () => void;
}

export const RestartBatch = ({
  appName,
  envName,
  jobComponentName,
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
  const onRestartBatch = (
    appName: string,
    envName: string,
    jobComponentName: string,
    batchName: string,
    smallBatchName: string
  ) => {
    promiseHandler(
      restartBatch(appName, envName, jobComponentName, batchName),
      onSuccess,
      `Error restarting batch '${smallBatchName}'`
    );
    onDone();
  };

  return (
    <div className="restart-job-content">
      <Typography as="span">
        Existing jobs for the batch <strong>{batchName}</strong>
        <br />
        will be deleted and started again. Would you like to proceed?
      </Typography>
      <div className="grid grid--gap-medium">
        <Button.Group className="grid grid--gap-small grid--auto-columns restart-job-buttons">
          <Button
            onClick={() =>
              onRestartBatch(
                appName,
                envName,
                jobComponentName,
                batchName,
                smallBatchName
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
  batchName: PropTypes.string.isRequired,
  smallBatchName: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
} as PropTypes.ValidationMap<RestartBatchProps>;
