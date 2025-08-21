import { Icon, Typography } from '@equinor/eds-core-react';
import {
  build_wrench,
  github,
  type IconData,
  lightbulb,
  pressure,
  radio_button_unselected,
  record,
} from '@equinor/eds-icons';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { Step } from '../../store/radix-api';
import { PipelineStep } from '../../utils/pipeline';
import { sortCompareDate } from '../../utils/sort-utils';
import { StepSummary } from './step-summary';
import { SubPipelineStepSummary } from './sub-pipeline-step-summary';

function getStepIcon(name: string): IconData {
  switch (name) {
    case PipelineStep.CloneConfig:
    case PipelineStep.CloneRepository:
      return github;
    case PipelineStep.OrchestratePipeline:
      return pressure;
    case PipelineStep.BuildComponent:
      return build_wrench;
    case PipelineStep.SubPipelineTaskStep:
      return lightbulb;

    default: {
      if (name.match(/^scan-(.+)$/)) {
        return record;
      }
      if (name.match(/^build-(.+)$/)) {
        return build_wrench;
      }
      return radio_button_unselected;
    }
  }
}

type GroupedSteps = {
  pipelineName: string;
  environment: string;
  steps: Step[];
};

// Assuming you already have your `steps` array:
const getSubPipelineSteps = (steps: Step[]): GroupedSteps[] => {
  const groups: Record<string, GroupedSteps> = {};
  const subPipelineSteps = (steps ?? []).filter(
    ({ name }) => name === 'sub-pipeline-step'
  );
  for (const step of subPipelineSteps) {
    const sub = step.subPipelineTaskStep;
    if (!sub) continue;

    const key = `${sub.pipelineName}||${sub.environment}`;
    if (!groups[key]) {
      groups[key] = {
        pipelineName: sub.pipelineName,
        environment: sub.environment,
        steps: [],
      };
    }

    groups[key].steps.push(step);
  }

  // Sort steps inside each group
  for (const key in groups) {
    groups[key].steps.sort((a, b) => {
      const aTime = a.started ? new Date(a.started).getTime() : 0;
      const bTime = b.started ? new Date(b.started).getTime() : 0;
      return aTime - bTime;
    });
  }

  // Convert to array and sort groups
  return Object.values(groups).sort((a, b) => {
    const nameCompare = a.pipelineName.localeCompare(b.pipelineName);
    if (nameCompare !== 0) return nameCompare;
    return a.environment.localeCompare(b.environment);
  });
};

export const StepsList: FunctionComponent<{
  appName: string;
  jobName: string;
  steps?: Array<Step>;
}> = ({ appName, jobName, steps }) => {
  const orchestrationStepName = 'radix-pipeline';
  const namedSteps = (steps ?? [])
    .filter(({ name }) => !!name && name !== 'sub-pipeline-step')
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
  const subPipelineSteps = getSubPipelineSteps(steps ?? []);

  const getStepKey = (step: Step) => {
    let stepKey = `${step.name}`;
    if (step.components) {
      stepKey += `-${step.components.join('-')}`;
    }
    if (step.subPipelineTaskStep) {
      stepKey += `-${step.subPipelineTaskStep.pipelineName}-${step.subPipelineTaskStep.environment}-${step.subPipelineTaskStep.taskName}-${step.subPipelineTaskStep.name}`;
    }
    return stepKey;
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
              <StepSummary appName={appName} jobName={jobName} step={step} />
            </div>
          ))
        ) : (
          <Typography>This job has no steps</Typography>
        )}
        {subPipelineSteps.length > 0 &&
          subPipelineSteps.map((groupedSteps) => (
            <React.Fragment
              key={`${groupedSteps.pipelineName}-${groupedSteps.environment}`}
            >
              <div className="steps-list__step">
                <div className="grid steps-list__divider">
                  <Icon className="step__icon" data={lightbulb} />
                </div>
                <Typography>
                  {'Sub-Pipeline'} / {groupedSteps.environment}
                </Typography>
              </div>
              {groupedSteps.steps.map((step) => (
                <div
                  key={getStepKey(step)}
                  className="steps-list__step--indented steps-list__step"
                >
                  <div className="grid steps-list__divider">
                    <Icon
                      className="step__icon"
                      data={getStepIcon(step.name ?? '')}
                    />
                    <span className="steps-list__divider-line" />
                  </div>
                  <SubPipelineStepSummary
                    appName={appName}
                    jobName={jobName}
                    step={step}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
      </div>
    </>
  );
};
