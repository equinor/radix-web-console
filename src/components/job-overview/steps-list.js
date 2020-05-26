import {
  faDotCircle,
  faTachometerAlt,
  faMagic,
  faQuestionCircle,
  faEye,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import StepSummary from './step-summary';
import StepModel from '../../models/step';

import EmptyState from '../empty-state';

const noStepsIcon = (
  <span className="steps-list__no-steps-icon fa-layers fa-fw fa-5x">
    <FontAwesomeIcon icon={faDotCircle} />
    <FontAwesomeIcon
      icon={faQuestionCircle}
      transform="shrink-10 down-5 right-5"
    />
  </span>
);

const getStepIcon = (step) => {
  if (step.name === 'clone-config' || step.name === 'clone') {
    return faGithub;
  }

  if (step.name === 'config-2-map') {
    return faCopy;
  }

  if (step.name === 'radix-pipeline') {
    return faTachometerAlt;
  }

  if (step.name.match(/^build-(.+)$/)) {
    return faMagic;
  }

  if (step.name.match(/^scan-(.+)$/)) {
    return faEye;
  }

  return faDotCircle;
};

export const StepsList = ({ appName, jobName, steps }) => {
  return (
    <div className="steps-list">
      {steps && steps.length === 0 && (
        <EmptyState title="No steps" icon={noStepsIcon}>
          This job has no steps
        </EmptyState>
      )}
      {steps && steps.length > 0 && (
        <React.Fragment>
          <h2 className="o-heading-section">Steps</h2>
          <ul>
            {steps.map((step) => (
              <li key={step.name}>
                <FontAwesomeIcon
                  className="steps-list__step-icon"
                  icon={getStepIcon(step)}
                  size="lg"
                />
                <StepSummary appName={appName} jobName={jobName} step={step} />
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

StepsList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(StepModel).isRequired,
};

export default StepsList;
