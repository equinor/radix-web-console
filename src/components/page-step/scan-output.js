import {
  Accordion,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import {
  useGetPipelineJobStepScanOutput,
  useGroupVulnerabilityList,
} from './effects';

import { Alert } from '../alert';
import { VulnerabilityList } from '../vulnerability-list';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

const ScanOutputOverview = ({ vulnerabilityList }) => {
  const groupedVulnerabilities = useGroupVulnerabilityList(vulnerabilityList);

  return vulnerabilityList?.length > 0 ? (
    <>
      {Object.keys(groupedVulnerabilities).map((severity) => (
        <Accordion className="accordion" chevronPosition="right" key={severity}>
          <Accordion.Item>
            <Accordion.Header>
              <Accordion.HeaderTitle>
                {severity} ({groupedVulnerabilities[severity].length})
              </Accordion.HeaderTitle>
            </Accordion.Header>
            <Accordion.Panel>
              <VulnerabilityList
                vulnerabilityList={groupedVulnerabilities[severity]}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  ) : (
    <Alert type="info">No vulnerabilities found</Alert>
  );
};

export const ScanOutput = ({ appName, jobName, stepName }) => {
  const [getPipelineJobStepScanOutput] = useGetPipelineJobStepScanOutput(
    appName,
    jobName,
    stepName
  );

  switch (getPipelineJobStepScanOutput.status) {
    case RequestState.IDLE:
    case RequestState.IN_PROGRESS: {
      return (
        <Typography>
          <CircularProgress size={16} /> Loading…
        </Typography>
      );
    }

    case RequestState.FAILURE: {
      return (
        <Alert type="danger">Error: {getPipelineJobStepScanOutput.error}</Alert>
      );
    }

    default: {
      return (
        <ScanOutputOverview
          vulnerabilityList={getPipelineJobStepScanOutput.data}
        />
      );
    }
  }
};

ScanOutput.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
};

export default ScanOutput;
