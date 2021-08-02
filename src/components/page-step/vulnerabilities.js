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
import AsyncResource from '../async-resource/simple-async-resource';

import './style.css';
import { useEffect, useState } from 'react/cjs/react.development';

const SeveritySortOrder = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
};

const VulnerabilityContainer = ({ appName, jobName, stepName }) => {
  const [getPipelineJobStepScanOutput] = useGetPipelineJobStepScanOutput(
    appName,
    jobName,
    stepName
  );

  const vulnerabilityList = useNormaliseVulnerabilityList(
    getPipelineJobStepScanOutput.data
  );

  const [sortedVulnerabilityList, setSortedVulnerabilityList] = useState([]);
  useEffect(() => {
    const sorted = [...vulnerabilityList].sort((a, b) => {
      let compare =
        (SeveritySortOrder[a.severity] ?? 999) -
        (SeveritySortOrder[b.severity] ?? 999);

      if (compare === 0) {
        compare = -((a.cvss || 0) - (b.cvss || 0));
      }

      return compare;
    });
    setSortedVulnerabilityList(sorted);
  }, [vulnerabilityList]);

  const groupedVulnerabilities = useGroupVulnerabilityList(
    sortedVulnerabilityList
  );

  return (
    <>
      <AsyncResource asyncState={getPipelineJobStepScanOutput}>
        <div>
          {getPipelineJobStepScanOutput.status === requestStates.SUCCESS && (
            <>
              <Accordion chevronPosition="right" className="accordion">
                {Object.keys(groupedVulnerabilities).map((severity) => (
                  <Accordion.Item className="accordion__item">
                    <Accordion.Header className="accordion__header body_short">
                      {severity}
                    </Accordion.Header>
                    <Accordion.Panel className="accordion__panel">
                      <VulnerabilityList
                        vulnerabilityList={groupedVulnerabilities[severity]}
                      ></VulnerabilityList>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </>
          )}
        </div>
      </AsyncResource>
    </>
  );
};

VulnerabilityContainer.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
};

export default VulnerabilityContainer;
