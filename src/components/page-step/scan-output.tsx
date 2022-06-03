import * as PropTypes from 'prop-types';

import { useGetJobStepScanOutput } from './use-get-job-step-scan-output';

import { Alert } from '../alert';
import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import { VulnerabilityDetails } from '../vulnerability-details';

import './style.css';

export interface ScanOutputProps {
  appName: string;
  jobName: string;
  stepName: string;
}

export const ScanOutput = ({
  appName,
  jobName,
  stepName,
}: ScanOutputProps): JSX.Element => {
  const [getScanState] = useGetJobStepScanOutput(appName, jobName, stepName);

  return (
    <SimpleAsyncResource
      asyncState={getScanState}
      customError={<Alert type="danger">Error: {getScanState.error}</Alert>}
    >
      {getScanState.data && (
        <VulnerabilityDetails vulnerabilities={getScanState.data} />
      )}
    </SimpleAsyncResource>
  );
};

ScanOutput.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
} as PropTypes.ValidationMap<ScanOutputProps>;
