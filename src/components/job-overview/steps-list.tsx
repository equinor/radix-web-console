import { Icon, Typography } from '@equinor/eds-core-react';
import {
  type IconData,
  github,
  pressure,
  radio_button_unselected,
  record,
} from '@equinor/eds-icons';
import type { FunctionComponent } from 'react';

import { StepSummary } from './step-summary';

import type { Step } from '../../store/radix-api';
import { PipelineStep } from '../../utils/pipeline';
import { sortCompareDate } from '../../utils/sort-utils';
import { SubPipelineStepSummary } from './sub-pipeline-step-summary';

function getStepIcon(name: string): IconData {
  switch (name) {
    case PipelineStep.CloneConfig:
    case PipelineStep.CloneRepository:
      return github;
    case PipelineStep.OrchestratePipeline:
      return pressure;

    default: {
      if (name.match(/^scan-(.+)$/)) {
        return record;
      }
      return radio_button_unselected;
    }
  }
}

export const StepsList: FunctionComponent<{
  appName: string;
  jobName: string;
  steps?: Array<Step>;
}> = ({ appName, jobName, steps }) => {
  const orchestrationStepName = 'radix-pipeline';
  const namedSteps = (steps ?? [])
    .filter(({ name }) => !!name)
    .sort((a: Step, b: Step): number =>
      a.name == orchestrationStepName
        ? -1
        : b.name == orchestrationStepName
          ? 1
          : (sortCompareDate(
              a.started ?? new Date('9999-01-01T00:00:00Z'),
              b.started ?? new Date('9999-01-01T00:00:00Z')
            ) ?? a.name?.localeCompare(b.name ?? ''))
    );

  const getStepKey = (step: Step) => {
    return step.components?.length == 1
      ? `${step.name}-${step.components[0]}`
      : step.name;
  };
  return (
    <>
      <Typography variant="h4">Steps</Typography>
      <div className="grid grid--gap-medium">
        {namedSteps.length > 0 ? (
          namedSteps.map((step) => (
            <div key={getStepKey(step)} className="steps-list__step">
              <div className="grid steps-list__divider">
                <Icon
                  className="step__icon"
                  data={getStepIcon(step.name ?? '')}
                />
                <span className="steps-list__divider-line" />
              </div>
              {step.name === 'sub-pipeline-step' ? (
                <SubPipelineStepSummary
                  appName={appName}
                  jobName={jobName}
                  step={step}
                />
              ) : (
                <StepSummary appName={appName} jobName={jobName} step={step} />
              )}
            </div>
          ))
        ) : (
          <Typography>This job has no steps</Typography>
        )}
      </div>
    </>
  );
};
