import { Icon, Typography } from '@equinor/eds-core-react';
import {
  copy,
  github,
  pressure,
  radio_button_unselected,
  record,
  track_changes,
} from '@equinor/eds-icons';
import PropTypes from 'prop-types';

import StepSummary from './step-summary';
import StepModel from '../../models/step';

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
  return (
    <>
      <Typography variant="h4">Steps</Typography>
      <div className="grid grid--gap-medium">
        {namedSteps.length > 0 ? (
          namedSteps
            .sort(
              (a, b) => a.started - b.started || a.name.localeCompare(b.name)
            )
            .map((step) => (
              <div key={step.name} className="steps-list__step">
                <div className="grid steps-list__divider">
                  <Icon className="step__icon" data={getStepIcon(step)} />
                  <span className="steps-list__divider-line"></span>
                </div>
                <StepSummary appName={appName} jobName={jobName} step={step} />
              </div>
            ))
        ) : (
          <Typography>This job has no steps</Typography>
        )}
      </div>
    </>
  );
};

StepsList.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape(StepModel)).isRequired,
};

export default StepsList;
