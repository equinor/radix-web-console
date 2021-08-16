import { Icon, Typography } from '@equinor/eds-core-react';
import {
  copy,
  github,
  help,
  pressure,
  radio_button_unselected,
  record,
  track_changes,
  trip_origin,
} from '@equinor/eds-icons';
import PropTypes from 'prop-types';
import React from 'react';

import StepSummary from './step-summary';
import EmptyState from '../empty-state';
import StepModel from '../../models/step';

const noStepsIcon = (
  <span className="steps-list__no-steps-icon">
    <Icon className="primary-icon" data={trip_origin} />
    <Icon className="secondary-icon" data={help} />
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
  }

  return radio_button_unselected;
};

export const StepsList = ({ appName, jobName, steps }) => {
  const namedSteps = steps ? steps.filter((s) => s.name) : [];
  return namedSteps.length > 0 ? (
    <>
      <Typography variant="h4">Steps</Typography>
      <div className="steps-list__content">
        {namedSteps.map((step) => (
          <div key={step.name} className="steps-list__step">
            <div className="steps-list__icon">
              <Icon data={getStepIcon(step)} />
              <span className="steps-list__divider-line"></span>
            </div>
            <StepSummary appName={appName} jobName={jobName} step={step} />
          </div>
        ))}
      </div>
    </>
  ) : (
    <EmptyState title="No steps" icon={noStepsIcon}>
      This job has no steps
    </EmptyState>
  );
};

StepsList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape(StepModel)).isRequired,
};

export default StepsList;
