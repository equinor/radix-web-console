import {
  Accordion,
  CircularProgress,
  Typography,
} from '@equinor/eds-core-react';
import PropTypes from 'prop-types';

import {
  useGetPipelineJobStepScanOutput,
  useGroupVulnerabilityList,
  useNormaliseVulnerabilityList,
} from './effects';

import Alert from '../alert';
import VulnerabilityList from '../vulnerability-list';
import requestStates from '../../state/state-utils/request-states';

import './style.css';

const ScanOutputLoading = () => (
  <Typography>
    <CircularProgress size={16} /> Loading…
  </Typography>
);

const ScanOutputError = ({ message }) => (
  <Alert type="danger">Error: {message}</Alert>
);

const ScanOutputOverview = ({ vulnerabilityList }) => {
  const normalisedVulnerabilities =
    useNormaliseVulnerabilityList(vulnerabilityList);

  const groupedVulnerabilities = useGroupVulnerabilityList(
    normalisedVulnerabilities
  );

  return normalisedVulnerabilities.length > 0 ? (
    <Accordion chevronPosition="right">
      {Object.keys(groupedVulnerabilities).map((severity) => (
        <Accordion.Item key={severity}>
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
      ))}
    </Accordion>
  ) : (
    <Alert type="info">No vulnerabilities found</Alert>
  );
};

const ScanOutput = ({ appName, jobName, stepName }) => {
  const [getPipelineJobStepScanOutput] = useGetPipelineJobStepScanOutput(
    appName,
    jobName,
    stepName
  );

  switch (getPipelineJobStepScanOutput.status) {
    case (requestStates.IDLE, requestStates.IN_PROGRESS): {
      return <ScanOutputLoading />;
    }

    case requestStates.FAILURE: {
      return <ScanOutputError message={getPipelineJobStepScanOutput.error} />;
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
