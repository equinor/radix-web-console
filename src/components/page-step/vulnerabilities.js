import PropTypes from 'prop-types';
import React from 'react';

import { Typography, Accordion } from '@equinor/eds-core-react';
import {
  useGetPipelineJobStepScanOutput,
  useNormaliseVulnerabilityList,
  useGroupVulnerabilityList,
} from './effects';
import VulnerabilityList from '../vulnerability-list';

import requestStates from '../../state/state-utils/request-states';

import './style.css';

// const SeveritySortOrder = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'UNKNOWN'];

const VulnerabilityContainer = ({ appName, jobName, stepName }) => {
  const [getPipelineJobStepScanOutput] = useGetPipelineJobStepScanOutput(
    appName,
    jobName,
    stepName
  );

  const vulnerabilityList = useNormaliseVulnerabilityList(
    getPipelineJobStepScanOutput.data
  );

  const groupedVulnerabilities = useGroupVulnerabilityList(vulnerabilityList);

  console.log(groupedVulnerabilities);

  return (
    <>
      <Typography variant="h4">Vulnerabilities</Typography>
      <div>
        {getPipelineJobStepScanOutput.status === requestStates.SUCCESS && (
          <>
            <Accordion chevronPosition="right" className="accordion">
              <Accordion.Item className="accordion__item">
                <Accordion.Header className="accordion__header body_short">
                  Header 1
                </Accordion.Header>
                <Accordion.Panel className="accordion__panel">
                  <VulnerabilityList
                    vulnerabilityList={vulnerabilityList}
                  ></VulnerabilityList>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </>
        )}
      </div>
    </>
  );
};

VulnerabilityContainer.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
};

export default VulnerabilityContainer;
