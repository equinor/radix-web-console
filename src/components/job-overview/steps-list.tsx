import { Icon, Typography } from '@equinor/eds-core-react';
import {
  IconData,
  copy,
  github,
  pressure,
  radio_button_unselected,
  record,
  track_changes,
} from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { StepSummary } from './step-summary';

import {
  StepModel,
  StepModelValidationMap,
} from '../../models/radix-api/jobs/step';
import { PipelineStep } from '../../utils/pipeline';
import { sortCompareDate } from '../../utils/sort-utils';

function getStepIcon({ name }: StepModel): IconData {
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
}

function sortSteps(a: StepModel, b: StepModel): number {
  return (
    sortCompareDate(
      a.started ?? new Date('9999-01-01T00:00:00Z'),
      b.started ?? new Date('9999-01-01T00:00:00Z')
    ) ?? a.name.localeCompare(b.name)
  );
}

export interface StepsListProps {
  appName: string;
  jobName: string;
  steps?: Array<StepModel>;
}

export const StepsList: FunctionComponent<StepsListProps> = ({
  appName,
  jobName,
  steps,
}) => {
  const namedSteps = (steps ?? []).filter(({ name }) => !!name);

  return (
    <>
      <Typography variant="h4">Steps</Typography>
      <div className="grid grid--gap-medium">
        {namedSteps.length > 0 ? (
          namedSteps.sort(sortSteps).map((step) => (
            <div key={step.name} className="steps-list__step">
              <div className="grid steps-list__divider">
                <Icon className="step__icon" data={getStepIcon(step)} />
                <span className="steps-list__divider-line" />
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
  steps: PropTypes.arrayOf(
    PropTypes.shape(StepModelValidationMap) as PropTypes.Validator<StepModel>
  ),
};
