import { Icon, Typography } from '@equinor/eds-core-react';
import {
  copy,
  github,
  pressure,
  radio_button_unselected,
  record,
  track_changes,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';

import { StepSummary } from './step-summary';

import { StepModelValidationMap } from '../../models/radix-api/jobs/step';
import { PipelineStep } from '../../utils/pipeline';

const getStepIcon = ({ name }) => {
  switch (name) {
    case PipelineStep.CloneConfig:
    case PipelineStep.CloneRepository:
      return github;

    case PipelineStep.CloneConfigToMap: // outdated, needed for old jobs
    case PipelineStep.PreparePipelines:
      return copy;

    case PipelineStep.OrchestratePipeline:
      return pressure;

    default: {
      if (name === PipelineStep.RunSubPipeline || name.match(/^build-(.+)$/)) {
        return track_changes;
      } else if (name.match(/^scan-(.+)$/)) {
        return record;
      }

      return radio_button_unselected;
    }
  }
};

function sortSteps(a, b) {
  const a_started = a.started ?? new Date('9999-01-01T00:00:00Z');
  const b_started = b.started ?? new Date('9999-01-01T00:00:00Z');
  return a_started - b_started || a.name.localeCompare(b.name);
}

export const StepsList = ({ appName, jobName, steps }) => {
  const namedSteps = steps?.filter(({ name }) => !!name) || [];
  return (
    <>
      <Typography variant="h4">Steps</Typography>
      <div className="grid grid--gap-medium">
        {namedSteps.length > 0 ? (
          namedSteps.sort(sortSteps).map((step) => (
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
  steps: PropTypes.arrayOf(PropTypes.shape(StepModelValidationMap)).isRequired,
};
