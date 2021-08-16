import PropTypes from 'prop-types';
import React from 'react';

import {
  useGetPipelineJobStepScanOutput,
  useNormaliseVulnerabilityList,
  useGroupVulnerabilityList,
} from './effects';
import requestStates from '../../state/state-utils/request-states';

import { Accordion, CircularProgress } from '@equinor/eds-core-react';
import VulnerabilityList from '../vulnerability-list';
import Alert from '../alert';

import './style.css';

const ScanOutputLoading = () => (
  <span>
    <CircularProgress size="16" /> Loading…
  </span>
);

const ScanOutputError = ({ message }) => (
  <Alert type="danger">Error: {message}</Alert>
);

const ScanOutputOverview = ({ vulnerabilityList }) => {
  const normalisedVulnerabilities = useNormaliseVulnerabilityList(
    vulnerabilityList
  );

  const groupedVulnerabilities = useGroupVulnerabilityList(
    normalisedVulnerabilities
  );

  if (normalisedVulnerabilities.length === 0) {
    return <Alert type="info">No vulnerabilities found</Alert>;
  }

  return (
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
            ></VulnerabilityList>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
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
      return <ScanOutputLoading></ScanOutputLoading>;
    }
    case requestStates.FAILURE: {
      return (
        <ScanOutputError
          message={getPipelineJobStepScanOutput.error}
        ></ScanOutputError>
      );
    }
    default: {
      return (
        <ScanOutputOverview
          vulnerabilityList={getPipelineJobStepScanOutput.data}
        ></ScanOutputOverview>
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
