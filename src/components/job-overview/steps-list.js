import { Icon } from '@equinor/eds-core-react';
import {
  copy,
  github,
  pressure,
  radio_button_unselected,
  record,
  track_changes,
} from '@equinor/eds-icons';
import {
  faDotCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import StepSummary from './step-summary';
import EmptyState from '../empty-state';
import StepModel from '../../models/step';

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
    return github;
  } else if (step.name === 'config-2-map') {
    return copy;
  } else if (step.name === 'radix-pipeline') {
    return pressure;
  } else if (step.name.match(/^build-(.+)$/)) {
    return track_changes;
  } else if (step.name.match(/^scan-(.+)$/)) {
    return record;
  } else {
    return radio_button_unselected;
  }
};

export const StepsList = ({ appName, jobName, steps }) => {
  const namedSteps = steps ? steps.filter((s) => s.name) : [];
  return (
    <>
      {namedSteps && (
        <>
          {namedSteps.length > 0 ? (
            <React.Fragment>
              <h4>Steps</h4>
              <div className="steps-list__content">
                {namedSteps.map((step) => (
                  <div key={step.name} className="steps-list__step">
                    <div className="steps-list__icon">
                      <Icon data={getStepIcon(step)} />
                      <span className="steps-list__divider-line"></span>
                    </div>
                    <StepSummary
                      appName={appName}
                      jobName={jobName}
                      step={step}
                    />
                  </div>
                ))}
              </div>
            </React.Fragment>
          ) : (
            <EmptyState title="No steps" icon={noStepsIcon}>
              This job has no steps
            </EmptyState>
          )}
        </>
      )}
    </>
  );
};

StepsList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape(StepModel)).isRequired,
};

export default StepsList;
